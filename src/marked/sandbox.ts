/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as Acorn from 'acorn';
import * as EST from "estree";
import { ERROR_CODE } from '../declare/error';
import { EST_TYPE, Evaluator } from "../declare/node";
import { ISandbox, ISandboxOptions, OptionName } from '../declare/sandbox';
import { IExposed, IScope, ITrace, VARIABLE_TYPE } from '../declare/variable';
import { markedParser } from '../extension/parser';
import { assert } from '../util/error/assert';
import { error } from "../util/error/error";
import { awaitableSleep, getDefaultSandboxOption, getRawCodeLength } from '../util/options';
import { Scope } from "../variable/scope";
import { Trace } from '../variable/trace';

export class Sandbox implements ISandbox {

    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private _count: number;
    private _rootScope: Scope;
    private _parser: typeof Acorn.Parser;

    private _broke: boolean;
    private _configs: Map<string, any>;
    private _exposed: Map<string, any>;
    private _modules: Map<string, any>;

    private _options: ISandboxOptions;

    public constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
        this._parser = Acorn.Parser.extend(markedParser as any);
        this._count = 0;

        this._broke = false;
        this._configs = new Map<string, any>();
        this._exposed = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._options = getDefaultSandboxOption();
    }

    public get broke(): boolean {

        return this._broke;
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

    public break(): Sandbox {

        this._broke = true;
        return this;
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

        if (this._modules.has(name)) {

            throw error(ERROR_CODE.DUPLICATED_PROVIDED_MODULE_NAME, name);
        }
        this._modules.set(name, value);
        return this;
    }

    public async evaluate(script: string): Promise<any> {

        const isCodeLengthExceed: boolean = getRawCodeLength(script) > this._options.maxCodeLength;
        if (isCodeLengthExceed) {

            this.break();
            throw error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED);
        }

        const AST: EST.BaseNode = this.parse(script);
        const trace: Trace = Trace.init();
        return await this.execute(AST, this._rootScope, trace);
    }

    public getOption<T extends OptionName>(name: T): ISandboxOptions[T] {

        const value: ISandboxOptions[T] = this._options[name];
        return assert(value as ISandboxOptions[T]).to.be.exist(ERROR_CODE.UNKNOWN_ERROR).firstValue();
    }

    public setOption<T extends OptionName>(name: T, value: ISandboxOptions[T]): Sandbox {

        this._options[name] = value;
        return this;
    }

    protected async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        if (this.getOption('duration') > 0) await awaitableSleep(this.getOption('duration'));

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

        const result: any = await executor.bind(this)(node, scope, trace);
        return result;
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
