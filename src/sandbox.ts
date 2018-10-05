/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

require('./binding');
import * as Acorn from 'acorn';
import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from 'marked#declare/variable';
import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";
import { Trace } from 'marked#variable/trace';
import { markedParser } from './extension/parser';

export class Sandbox {

    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private _rootScope: Scope;
    private _parser: typeof Acorn.Parser;

    private _configs: Map<string, any>;

    public constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
        this._parser = Acorn.Parser.extend(markedParser as any);
        this._configs = new Map<string, any>();
    }

    public config(name: string, value: any = true): Sandbox {
        this._configs.set(name, value);
        return this;
    }

    public mount<T extends EST_TYPE>(type: T, evaluator: Evaluator<T>): Sandbox {

        this._map.set(type, evaluator);
        return this;
    }

    public inject(name: string, value: any): Sandbox {

        this._rootScope.register(VARIABLE_TYPE.CONSTANT)(name, value);
        return this;
    }

    public async evaluate(script: string): Promise<any> {

        const AST: EST.BaseNode = this._parser.parse(script);
        const rootScope: Scope = Scope.fromScope(this._rootScope);
        const trace: Trace = Trace.init();
        return await this.execute(AST, rootScope, trace);
    }

    protected async execute(node: EST.BaseNode, scope: Scope, trace: Trace): Promise<any> {

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);
        if (!executor) throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type);

        return await executor.bind(this)(node, scope, trace);
    }
}
