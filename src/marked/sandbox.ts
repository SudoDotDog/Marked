/**
 * @author WMXPY
 * @namespace Marked
 * @description Sandbox
 */

import * as EST from "estree";
import { MarkedDebugBreakPoint } from "../debug/break-point/break-point";
import { MarkedDebugBreakPointController } from "../debug/break-point/controller";
import { MarkedDebugInterceptor } from "../debug/interceptor";
import { shouldDebugNode } from "../debug/node";
import { ERROR_CODE } from '../declare/error-code';
import { END_SIGNAL, Evaluator, MarkedResult } from "../declare/evaluate";
import { defaultSandboxLanguage, IExecuter, ISandbox, ISandboxOptions, MarkedMixin, ModuleResolver, ModuleResolveResult, OptionName, SandboxLanguage } from '../declare/sandbox';
import { ScriptLocation } from '../declare/script-location';
import { EST_TYPE } from '../declare/types';
import { IScope, ITrace, VARIABLE_TYPE } from '../declare/variable';
import { pauseForBreakPoint } from "../operation/break-point";
import { parseNativeToSand } from "../parse/native-to-sand";
import { parseScript } from "../parse/script/parse-script";
import { assert } from '../util/error/assert';
import { error, MarkedError } from "../util/error/error";
import { awaitableSleep, getDefaultSandboxOption, getRawCodeLength } from '../util/options';
import { Flag } from '../variable/flag';
import { Scope } from "../variable/scope";
import { Trace } from '../variable/trace/trace';
import { EvaluateResourceResult, EVALUATE_RESOURCE_END_SIGNAL, ParseScriptResult } from "./declare";
import { useEverything } from './evaluate';
import { Executer } from './executer';
import { MarkedLogRecorder } from "../log/log-recorder";
import { IMarkedExecuteLog } from "../log/declare";

export class Sandbox implements ISandbox {

    public static fromScratch(
        language: SandboxLanguage = defaultSandboxLanguage,
    ): Sandbox {

        return new Sandbox(language);
    }

    public static fromAllEvaluators(
        language: SandboxLanguage = defaultSandboxLanguage,
    ): Sandbox {

        const sandbox: Sandbox = new Sandbox(language);
        useEverything(sandbox);

        return sandbox;
    }

    private readonly _language: SandboxLanguage;

    private readonly _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;

    private readonly _bridgeScope: Scope;
    private readonly _executeScope: Scope;

    private readonly _configs: Map<string, any>;
    private readonly _modules: Map<string, any>;

    private readonly _resolvers: ModuleResolver[];
    private readonly _cachedExecuter: Map<string, IExecuter>;
    private readonly _cachedSource: Map<string, string>;

    private readonly _options: ISandboxOptions;

    private readonly _logRecorderSet: Set<MarkedLogRecorder>;

    private _debugInterceptor: MarkedDebugInterceptor | null;
    private _debugNextStep: boolean;

    private _count: number;
    private _broke: boolean;
    private _brokeFlag: Flag | null;

    private _skipping: boolean;
    private _skippingFlag: Flag | null;

    private _usingAdditionalArgument: boolean;
    private _additionalArgument?: any;

    private constructor(language: SandboxLanguage) {

        this._language = language;

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();

        this._bridgeScope = Scope.bridgeScope();
        this._executeScope = Scope.executeScope(this._bridgeScope);

        this._configs = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._resolvers = [];
        this._cachedExecuter = new Map<string, IExecuter>();
        this._cachedSource = new Map<string, string>();

        this._options = getDefaultSandboxOption();

        this._logRecorderSet = new Set<MarkedLogRecorder>();

        this._debugInterceptor = null;
        this._debugNextStep = false;

        this._count = 0;
        this._broke = false;
        this._brokeFlag = null;

        this._skipping = false;
        this._skippingFlag = null;

        this._usingAdditionalArgument = false;
        this._additionalArgument = undefined;
    }

    public get broke(): boolean {
        return this._broke;
    }
    public get count(): number {
        return this._count;
    }

    public get bridgeScope(): Scope {
        return this._bridgeScope;
    }
    public get executeScope(): Scope {
        return this._executeScope;
    }

    public get usingAdditionalArgument(): boolean {
        return this._usingAdditionalArgument;
    }
    public get additionalArgument(): any {
        return this._additionalArgument;
    }

    public use(mixin: MarkedMixin): this {

        mixin(this);
        return this;
    }

    public break(): this {

        this._broke = true;
        return this;
    }

    public skip(): this {

        this._skipping = true;
        return this;
    }

    public config(name: string, value?: any): this {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public inject(name: string, value: any): this {

        const parsedContent = parseNativeToSand(value);
        this._bridgeScope.register(VARIABLE_TYPE.CONSTANT)(name, parsedContent);
        return this;
    }

    public module(name: string): any | null {

        return this._modules.get(name) || null;
    }

    public mount<M extends EST_TYPE>(type: M, evaluator: Evaluator<M>): this {

        this._map.set(type, evaluator as any);
        return this;
    }

    public provide(name: string, value: any): this {

        if (this._modules.has(name)) {
            throw error(ERROR_CODE.DUPLICATED_PROVIDED_MODULE_NAME, name);
        }

        this._modules.set(name, value);
        return this;
    }

    public resolver(resolver: ModuleResolver): this {

        this._resolvers.push(resolver);
        return this;
    }

    public addLogRecorder(recorder: MarkedLogRecorder): this {

        this._logRecorderSet.add(recorder);
        return this;
    }

    public removeLogRecorder(recorder: MarkedLogRecorder): this {

        this._logRecorderSet.delete(recorder);
        return this;
    }

    public setDebugInterceptor(interceptor: MarkedDebugInterceptor): this {

        this._debugInterceptor = interceptor;
        return this;
    }

    public getOption<T extends OptionName>(name: T): ISandboxOptions[T] {

        const value: ISandboxOptions[T] = this._options[name];
        return assert(value).to.be.exist(ERROR_CODE.UNKNOWN_ERROR).firstValue();
    }

    public setOption<T extends OptionName>(name: T, value: ISandboxOptions[T]): this {

        this._options[name] = value;
        return this;
    }

    public setAdditionalArgument(value: any): Sandbox {

        this._usingAdditionalArgument = true;
        this._additionalArgument = value;
        return this;
    }

    public async evaluate(
        script: string,
        breakPoints?: Iterable<MarkedDebugBreakPoint>,
        scriptLocation: ScriptLocation = ScriptLocation.createRoot(),
        scope?: IScope,
    ): Promise<MarkedResult> {

        const isCodeLengthExceed: boolean =
            getRawCodeLength(script) > this._options.maxCodeLength;

        if (isCodeLengthExceed) {

            this.break();
            return {
                signal: END_SIGNAL.ABORTED,
                error: error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED),
            };
        }

        if (this._broke) {

            return {
                signal: END_SIGNAL.ABORTED,
                error: error(ERROR_CODE.SANDBOX_IS_BROKE),
            };
        }

        this._cachedSource.set(
            scriptLocation.hash(),
            script,
        );

        const targetScope: IScope = typeof scope === 'undefined'
            ? this._executeScope
            : scope;

        let parseResult: ParseScriptResult;

        const startTime: number = Date.now();

        try {

            parseResult = await parseScript(script, this._language);
        } catch (reason) {

            return {
                signal: END_SIGNAL.ABORTED,
                error: reason as any as MarkedError,
            };
        }

        try {

            const AST: EST.BaseNode = parseResult.estree;

            const breakPointController: MarkedDebugBreakPointController | undefined =
                typeof breakPoints === 'undefined'
                    ? undefined
                    : MarkedDebugBreakPointController.fromBreakPoints(breakPoints);

            const trace: Trace = Trace.init(
                scriptLocation,
                parseResult.locationFinder,
                breakPointController,
            );

            let result: any = await this.execute(
                AST as EST.Node,
                targetScope,
                trace,
            );

            if (this._broke) {

                if (this._brokeFlag instanceof Flag) {

                    if (this._brokeFlag.isThrow()) {
                        result = this._brokeFlag;
                    }
                    if (this._brokeFlag.isTerminate()) {
                        result = this._brokeFlag;
                    }
                }
            }

            const endTime: number = Date.now();

            if (result instanceof Flag) {

                if (result.isRootReturn()) {

                    return {
                        signal: END_SIGNAL.SUCCEED,
                        exports: targetScope.exposed,
                        rootReturn: {
                            hasRootReturn: true,
                            returnValue: result.getValue(),
                        },
                        comments: parseResult.comments,
                        startTime,
                        endTime,
                        duration: endTime - startTime,
                    };
                }

                if (result.isThrow()) {

                    return {
                        signal: END_SIGNAL.EXCEPTION,
                        trace: result.trace,
                        exception: result.getValue(),
                        comments: parseResult.comments,
                        startTime,
                        endTime,
                        duration: endTime - startTime,
                    };
                }

                if (result.isFatal()) {

                    return {
                        signal: END_SIGNAL.FAILED,
                        error: result.getValue(),
                        comments: parseResult.comments,
                        startTime,
                        endTime,
                        duration: endTime - startTime,
                    };
                }

                if (result.isTerminate()) {

                    return {
                        signal: END_SIGNAL.TERMINATED,
                        trace: result.trace,
                        comments: parseResult.comments,
                        startTime,
                        endTime,
                        duration: endTime - startTime,
                    };
                }
            }

            return {
                signal: END_SIGNAL.SUCCEED,
                exports: targetScope.exposed,
                rootReturn: {
                    hasRootReturn: false,
                },
                comments: parseResult.comments,
                startTime,
                endTime,
                duration: endTime - startTime,
            };
        } catch (reason) {

            const endTime: number = Date.now();

            return {
                signal: END_SIGNAL.FAILED,
                error: reason as any as MarkedError,
                comments: parseResult.comments,
                startTime,
                endTime,
                duration: endTime - startTime,
            };
        }
    }

    protected putExecuteLog(log: IMarkedExecuteLog): this {

        for (const recorder of this._logRecorderSet) {
            recorder.putExecuteLog(log);
        }
        return this;
    }

    protected getSourceCode(scriptLocation: ScriptLocation): string | null {

        if (!this._cachedSource.has(scriptLocation.hash())) {
            return null;
        }
        return this._cachedSource.get(scriptLocation.hash()) as string;
    }

    protected hasDebugInterceptor(): boolean {

        return this._debugInterceptor !== null;
    }

    protected ensureGetDebugInterceptor(): MarkedDebugInterceptor {

        if (this._debugInterceptor === null) {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }
        return this._debugInterceptor;
    }

    protected setNextStep(nextStep: boolean): this {

        this._debugNextStep = nextStep;
        return this;
    }

    protected breakWithFlag(flag: Flag): void {

        this.break();
        this._brokeFlag = flag;
    }

    protected skipWithFlag(flag: Flag): void {

        this.skip();
        this._skippingFlag = flag;
    }

    protected getSkippingFlag(): Flag | null {

        return this._skippingFlag;
    }

    protected recoverFromBreak(): void {

        this._broke = false;
        this._brokeFlag = null;
    }

    protected recoverFromSkip(): void {

        this._skipping = false;
        this._skippingFlag = null;
    }

    protected async resolveResource(source: string, trace: ITrace): Promise<ModuleResolveResult | null> {

        for (const resolver of this._resolvers) {

            const result: ModuleResolveResult | null = await Promise.resolve(
                resolver(source, trace),
            );

            if (result) {
                return result;
            }
        }
        return null;
    }

    protected async evaluateResource(
        resolveResult: ModuleResolveResult,
        breakPoints?: Iterable<MarkedDebugBreakPoint>,
    ): Promise<EvaluateResourceResult> {

        const hash: string = resolveResult.scriptLocation.hash();
        if (this._cachedExecuter.has(hash)) {

            const cachedExecuter: IExecuter = this._cachedExecuter.get(hash) as IExecuter;
            if (cachedExecuter.isExecuting()) {

                return {
                    signal: EVALUATE_RESOURCE_END_SIGNAL.CYCLED_IMPORT,
                };
            }

            return {
                signal: EVALUATE_RESOURCE_END_SIGNAL.SUCCEED,
                executer: cachedExecuter,
            };
        }

        const executer: Executer = Executer.from(this);
        this._cachedExecuter.set(hash, executer);

        const result: MarkedResult = await executer.evaluate(
            resolveResult.script,
            breakPoints,
            resolveResult.scriptLocation,
        );

        if (result.signal !== END_SIGNAL.SUCCEED) {

            return {
                signal: EVALUATE_RESOURCE_END_SIGNAL.EVALUATE_FAILED,
                result,
            };
        }

        return {
            signal: EVALUATE_RESOURCE_END_SIGNAL.SUCCEED,
            executer,
        };
    }

    protected async execute(node: EST.Node, scope: IScope, trace: ITrace): Promise<any> {

        this.putExecuteLog({
            node,
            scope,
            trace,
        });

        if (this.getOption('duration') > 0) {

            await awaitableSleep(this.getOption('duration'));
        }

        if (this._broke) {

            if (this._brokeFlag instanceof Flag) {
                return this._brokeFlag;
            }
            throw error(
                ERROR_CODE.SANDBOX_IS_BROKE,
                this._count.toString(),
                node,
                trace as Trace,
            );
        }

        if (this._skipping) {

            return;
        }

        if (this._count >= this._options.maxExpression) {

            this.break();
            throw error(
                ERROR_CODE.MAXIMUM_EXPRESSION_LIMIT_EXCEED,
                this._count.toString(),
                node as any,
                trace as Trace,
            );
        }

        if (shouldDebugNode(node.type)) {

            if (trace.hasBreakPointController()) {

                const breakPointController: MarkedDebugBreakPointController = trace.ensureBreakPointController();

                if (breakPointController.shouldBreak(trace.scriptLocation, node)) {
                    this.setNextStep(true);
                }
            }

            if (this._debugNextStep) {

                this.setNextStep(false);

                const bindingPauseForBreakPoint = pauseForBreakPoint.bind(this);

                await bindingPauseForBreakPoint(
                    node,
                    scope as Scope,
                    trace as Trace,
                );
            }
        }

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(
            node.type,
        );

        if (!executor) {

            throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type, node, trace as Trace);
        }

        this._count++;

        const result: any = await executor.bind(this)(node, scope as Scope, trace as Trace);
        return result;
    }
}
