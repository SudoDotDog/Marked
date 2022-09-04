/**
 * @author WMXPY
 * @namespace Marked
 * @description Sandbox
 */

import * as EST from "estree";
import { MarkedDebugInterceptor } from "../debug/interceptor";
import { ERROR_CODE } from '../declare/error-code';
import { END_SIGNAL, Evaluator, MarkedResult } from "../declare/evaluate";
import { defaultSandboxLanguage, IExecuter, ISandbox, ISandboxOptions, ModuleResolver, ModuleResolveResult, OptionName, SandboxLanguage } from '../declare/sandbox';
import { ScriptLocation } from '../declare/script-location';
import { EST_TYPE } from '../declare/types';
import { IExposed, IScope, ITrace, VARIABLE_TYPE } from '../declare/variable';
import { useEverything } from '../evaluate/evaluate';
import { parseCodeToESTree } from '../parse/parse-estree';
import { transpileTypeScriptCode } from "../parse/transpile-typescript";
import { assert } from '../util/error/assert';
import { error, MarkedError } from "../util/error/error";
import { awaitableSleep, getDefaultSandboxOption, getRawCodeLength } from '../util/options';
import { Flag } from '../variable/flag';
import { parseNativeToSand } from '../variable/parse';
import { Scope } from "../variable/scope";
import { Trace } from '../variable/trace/trace';
import { Executer } from './executer';

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
    private readonly _rootScope: Scope;

    private readonly _configs: Map<string, any>;
    private readonly _modules: Map<string, any>;

    private readonly _resolvers: ModuleResolver[];
    private readonly _cachedExecuter: Map<string, IExecuter>;

    private readonly _options: ISandboxOptions;

    private _debugInterceptor: MarkedDebugInterceptor | null;

    private _count: number;
    private _broke: boolean;
    private _brokeFlag: Flag | null = null;

    private _usingAdditionalArgument: boolean;
    private _additionalArgument?: any;

    private constructor(language: SandboxLanguage) {

        this._language = language;

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();

        this._configs = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._resolvers = [];
        this._cachedExecuter = new Map<string, IExecuter>();

        this._options = getDefaultSandboxOption();

        this._debugInterceptor = null;

        this._count = 0;
        this._broke = false;
        this._brokeFlag = null;

        this._usingAdditionalArgument = false;
        this._additionalArgument = undefined;
    }

    public get broke(): boolean {
        return this._broke;
    }
    public get count(): number {
        return this._count;
    }

    public get scope(): Scope {
        return this._rootScope;
    }
    public get exposed(): IExposed {
        return this._rootScope.exposed;
    }

    public get usingAdditionalArgument(): boolean {
        return this._usingAdditionalArgument;
    }
    public get additionalArgument(): any {
        return this._additionalArgument;
    }

    public break(): Sandbox {

        this._broke = true;
        return this;
    }

    public config(name: string, value?: any): Sandbox {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public inject(name: string, value: any): Sandbox {

        const parsedContent = parseNativeToSand(value);
        this._rootScope.register(VARIABLE_TYPE.CONSTANT)(name, parsedContent);
        return this;
    }

    public module(name: string): any | null {

        return this._modules.get(name) || null;
    }

    public mount<M extends EST_TYPE>(type: M, evaluator: Evaluator<M>): Sandbox {

        this._map.set(type, evaluator as any);
        return this;
    }

    public provide(name: string, value: any): Sandbox {

        if (this._modules.has(name)) {

            throw error(ERROR_CODE.DUPLICATED_PROVIDED_MODULE_NAME, name);
        }

        this._modules.set(name, value);
        return this;
    }

    public resolver(resolver: ModuleResolver): Sandbox {

        this._resolvers.push(resolver);
        return this;
    }

    public async evaluate(
        script: string,
        scriptLocation?: ScriptLocation,
        scope?: IScope,
    ): Promise<MarkedResult> {

        const isCodeLengthExceed: boolean = getRawCodeLength(script) > this._options.maxCodeLength;

        if (isCodeLengthExceed) {

            this.break();
            return {
                signal: END_SIGNAL.FAILED,
                error: error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED),
            };
        }

        try {

            const AST: EST.BaseNode = await this.parse(script);
            const trace: Trace = Trace.init(scriptLocation);

            const targetScope: IScope = typeof scope === 'undefined'
                ? this._rootScope
                : scope;
            let result: any = await this.execute(AST, targetScope, trace);

            if (this._broke) {
                if (this._brokeFlag instanceof Flag) {
                    if (this._brokeFlag.isThrow()) {
                        result = this._brokeFlag;
                    }
                }
            }

            if (result instanceof Flag) {

                if (result.isThrow()) {

                    return {
                        signal: END_SIGNAL.EXCEPTION,
                        trace: result.trace,
                        exception: result.getValue(),
                    };
                }
            }
        } catch (reason) {

            return {
                signal: END_SIGNAL.FAILED,
                error: reason as any as MarkedError,
            };
        }

        return {
            signal: END_SIGNAL.SUCCEED,
            exports: this._rootScope.exposed,
        };
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

    protected hasDebugInterceptor(): boolean {

        return this._debugInterceptor !== null;
    }

    protected ensureGetDebugInterceptor(): MarkedDebugInterceptor {

        if (this._debugInterceptor === null) {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }
        return this._debugInterceptor;
    }

    protected breakWithFlag(flag: Flag): void {

        this.break();
        this._brokeFlag = flag;
    }

    protected recoverFromBreak(): void {

        this._broke = false;
        this._brokeFlag = null;
    }

    protected async resolveResource(source: string, trace: ITrace): Promise<ModuleResolveResult | null> {

        for (const resolver of this._resolvers) {

            const result: ModuleResolveResult | null = await Promise.resolve(resolver(source, trace));

            if (result) {
                return result;
            }
        }
        return null;
    }

    protected async executeResource(resolveResult: ModuleResolveResult): Promise<IExecuter | null> {

        const hash: string = resolveResult.scriptLocation.hash();
        if (this._cachedExecuter.has(hash)) {

            return this._cachedExecuter.get(hash) as IExecuter;
        }

        const executer: Executer = Executer.from(this);
        const result: MarkedResult = await executer.evaluate(resolveResult.script, resolveResult.scriptLocation);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            return null;
        }

        this._cachedExecuter.set(hash, executer);
        return executer;
    }

    protected async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        if (this.getOption('duration') > 0) {

            await awaitableSleep(this.getOption('duration'));
        }

        if (this._broke) {

            if (this._brokeFlag instanceof Flag) {
                if (this._brokeFlag.isThrow()) {
                    return this._brokeFlag;
                }
            }
            throw error(ERROR_CODE.SANDBOX_IS_BROKE, this._count.toString(), node as any, trace as Trace);
        }

        if (this._count >= this._options.maxExpression) {

            this.break();
            throw error(ERROR_CODE.MAXIMUM_EXPRESSION_LIMIT_EXCEED, this._count.toString(), node as any, trace as Trace);
        }

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);

        if (!executor) {

            throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type, node as EST.Node, trace as Trace);
        }

        this._count++;

        const result: any = await executor.bind(this)(node as any, scope as Scope, trace as Trace);
        return result;
    }

    protected async parse(script: string): Promise<EST.BaseNode> {

        if (this._language === 'javascript') {
            return await this._parseJavaScript(script);
        } else if (this._language === 'typescript') {
            return await this._parseTypeScript(script);
        }

        throw error(ERROR_CODE.UNKNOWN_LANGUAGE);
    }

    private async _parseJavaScript(script: string): Promise<EST.BaseNode> {

        try {

            return await parseCodeToESTree(script);
        } catch (err) {

            const syntaxError: any = err;
            throw error(ERROR_CODE.PARSE_ERROR, syntaxError.message, `POS:${syntaxError.pos}, RAISEDAT:${syntaxError.raisedAt}` as any);
        }
    }

    private async _parseTypeScript(script: string): Promise<EST.BaseNode> {

        try {

            const typeScriptCode: string = await transpileTypeScriptCode(script);
            return await this._parseJavaScript(typeScriptCode);
        } catch (err) {

            throw error(ERROR_CODE.TYPESCRIPT_COMPILE_ERROR);
        }
    }
}
