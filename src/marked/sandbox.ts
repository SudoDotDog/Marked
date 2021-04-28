/**
 * @author WMXPY
 * @namespace Marked
 * @description Sandbox
 */

import * as Acorn from 'acorn';
import * as EST from "estree";
import { ERROR_CODE } from '../declare/error';
import { END_SIGNAL, Evaluator, MarkedResult } from "../declare/evaluate";
import { IExecuter, ISandbox, ISandboxOptions, ModuleResolver, ModuleResolveResult, OptionName } from '../declare/sandbox';
import { ScriptLocation } from '../declare/script-location';
import { EST_TYPE } from '../declare/types';
import { IExposed, IScope, ITrace, VARIABLE_TYPE } from '../declare/variable';
import { markedParser } from '../extension/parser';
import { assert } from '../util/error/assert';
import { error } from "../util/error/error";
import { awaitableSleep, getDefaultSandboxOption, getRawCodeLength } from '../util/options';
import { Flag } from '../variable/flag';
import { parseNativeToSand } from '../variable/parse';
import { Scope } from "../variable/scope";
import { Trace } from '../variable/trace';
import { Executer } from './executer';

export class Sandbox implements ISandbox {

    public static create(): Sandbox {

        return new Sandbox();
    }

    private readonly _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private readonly _rootScope: Scope;
    private readonly _parser: typeof Acorn.Parser;

    private readonly _configs: Map<string, any>;
    private readonly _modules: Map<string, any>;

    private readonly _resolvers: ModuleResolver[];
    private readonly _cachedExecuter: Map<string, IExecuter>;

    private readonly _options: ISandboxOptions;

    private _count: number;
    private _broke: boolean;

    private constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
        this._parser = Acorn.Parser.extend(markedParser as any);

        this._configs = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._resolvers = [];
        this._cachedExecuter = new Map<string, IExecuter>();

        this._options = getDefaultSandboxOption();

        this._count = 0;
        this._broke = false;
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

    public async evaluate(script: string, scriptLocation?: ScriptLocation, scope?: IScope): Promise<MarkedResult> {

        const isCodeLengthExceed: boolean = getRawCodeLength(script) > this._options.maxCodeLength;

        if (isCodeLengthExceed) {

            this.break();
            return {
                signal: END_SIGNAL.FAILED,
                error: error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED),
            };
        }

        const AST: EST.BaseNode = this.parse(script);
        const trace: Trace = Trace.init(scriptLocation);

        try {

            const targetScope: IScope = typeof scope === 'undefined'
                ? this._rootScope
                : scope;
            const result: any = await this.execute(AST, targetScope, trace);

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
                error: reason,
            };
        }

        return {
            signal: END_SIGNAL.SUCCEED,
            exports: this._rootScope.exposed,
        };
    }

    public getOption<T extends OptionName>(name: T): ISandboxOptions[T] {

        const value: ISandboxOptions[T] = this._options[name];
        return assert(value).to.be.exist(ERROR_CODE.UNKNOWN_ERROR).firstValue();
    }

    public setOption<T extends OptionName>(name: T, value: ISandboxOptions[T]): Sandbox {

        this._options[name] = value;
        return this;
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

    protected parse(script: string): EST.BaseNode {

        try {

            const AST: EST.BaseNode = this._parser.parse(script, {

                locations: true,
                allowReturnOutsideFunction: false,
                allowAwaitOutsideFunction: false,
                allowHashBang: false,
                sourceType: 'module',
                ecmaVersion: 'latest',
            });
            return AST;
        } catch (err) {

            const syntaxError = err;
            throw error(ERROR_CODE.ACORN_ERROR, syntaxError.message, `POS:${syntaxError.pos}, RAISEDAT:${syntaxError.raisedAt}` as any);
        }
    }
}
