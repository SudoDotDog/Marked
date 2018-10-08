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
import { IExposed, ISandbox, IScope, ITrace, VARIABLE_TYPE } from 'marked#declare/variable';
import { error } from "marked#util/error/error";
import { Scope } from "marked#variable/scope";
import { Trace } from 'marked#variable/trace';
import { markedParser } from './extension/parser';

export class Sandbox implements ISandbox {

    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private _rootScope: Scope;
    private _parser: typeof Acorn.Parser;

    private _configs: Map<string, any>;
    private _exposed: Map<string, any>;

    public constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
        this._parser = Acorn.Parser.extend(markedParser as any);

        this._configs = new Map<string, any>();
        this._exposed = new Map<string, any>();
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

    public mount<M extends EST_TYPE>(type: M, evaluator: Evaluator<M>): Sandbox {

        this._map.set(type, evaluator);
        return this;
    }

    public inject(name: string, value: any): Sandbox {

        this._rootScope.register(VARIABLE_TYPE.CONSTANT)(name, value);
        return this;
    }

    public async evaluate(script: string): Promise<any> {

        const AST: EST.BaseNode = this.parse(script);
        const rootScope: Scope = Scope.fromScope(this._rootScope);
        const trace: Trace = Trace.init();
        return await this.execute(AST, rootScope, trace);
    }

    protected async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);
        if (!executor) throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type, node as EST.Node, trace as Trace);

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
