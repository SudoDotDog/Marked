/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

require('./binding');
import * as Acorn from 'acorn';
import * as EST from "estree";
import { ERROR_CODE } from 'marked#declare/error';
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { IExposed, ISandbox, ISandboxOptions, IScope, ITrace, OptionName, VARIABLE_TYPE } from 'marked#declare/variable';
import { assert } from 'marked#util/error/assert';
import { error } from "marked#util/error/error";
import { getDefaultSandboxOption } from 'marked#util/options';
import { Scope } from "marked#variable/scope";
import { Trace } from 'marked#variable/trace';
import { markedParser } from './extension/parser';

export class Sandbox implements ISandbox {

    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private _count: number;
    private _rootScope: Scope;
    private _parser: typeof Acorn.Parser;

    private _configs: Map<string, any>;
    private _exposed: Map<string, any>;
    private _modules: Map<string, any>;

    private _options: Map<OptionName, ISandboxOptions[OptionName]>;

    public constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
        this._parser = Acorn.Parser.extend(markedParser as any);
        this._count = 0;

        this._configs = new Map<string, any>();
        this._exposed = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._options = new Map<OptionName, ISandboxOptions[OptionName]>();

        const defaultSandboxOption: ISandboxOptions = getDefaultSandboxOption();
        Object.keys(defaultSandboxOption).forEach((key: string) =>
            this._options.set(key as OptionName, defaultSandboxOption[key as OptionName]));
    }

    public get count(): number {

        return this._count;
    }

    public get exposed(): IExposed {

        const result: IExposed = {
            default: this._exposed.get('default'),
        };
        return result;
    }

    public config(name: string, value?: any): Sandbox {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public expose(name: string, value: any): Sandbox {
        this._exposed.set(name, value);
        return this;
    }

    public inject(name: string, value: any): Sandbox {

        this._rootScope.register(VARIABLE_TYPE.CONSTANT)(name, value);
        return this;
    }

    public module(name: string): any | null {

        return this._modules.get(name) || null;
    }

    public mount<M extends EST_TYPE>(type: M, evaluator: Evaluator<M>): Sandbox {

        this._map.set(type, evaluator);
        return this;
    }

    public provide(name: string, value: any): Sandbox {

        if (this._modules.has(name)) throw error(ERROR_CODE.DUPLICATED_PROVIDED_MODULE_NAME, name);
        this._modules.set(name, value);
        return this;
    }

    public async evaluate(script: string): Promise<any> {

        const AST: EST.BaseNode = this.parse(script);
        const rootScope: Scope = this._rootScope.child();
        const trace: Trace = Trace.init();
        return await this.execute(AST, rootScope, trace);
    }

    public getOption<T extends OptionName>(name: T): ISandboxOptions[T] {
        const value: ISandboxOptions[T] | undefined = this._options.get(name);
        return assert(value as ISandboxOptions[T]).to.be.exist(ERROR_CODE.UNKNOWN_ERROR).firstValue();
    }

    public setOption<T extends OptionName>(name: T, value: ISandboxOptions[T]): Sandbox {
        this._options.set(name, value);
        return this;
    }

    protected async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);
        if (!executor) throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type, node as EST.Node, trace as Trace);
        this._count++;

        return await executor.bind(this)(node, scope, trace);
    }

    protected parse(script: string): EST.BaseNode {

        try {
            const AST: EST.BaseNode = this._parser.parse(script, {
                sourceType: 'module',
            });
            return AST;
        } catch (err) {
            const syntaxError = err as any;
            throw error(ERROR_CODE.ACORN_ERROR, syntaxError.message, `POS:${syntaxError.pos}, RAISEDAT:${syntaxError.raisedAt}` as any);
        }
    }
}
