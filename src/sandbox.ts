/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

require('./binding');
import * as Acorn from 'acorn';
import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";

export class Sandbox {
    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;

    public constructor() {
        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
    }

    public mount<T extends EST_TYPE>(type: T, evaluator: Evaluator<T>): Sandbox {
        this._map.set(type, evaluator);
        return this;
    }

    public async evaluate(script: string) {
        const AST: EST.BaseNode = Acorn.parse(script);
        const rootScope: Scope = Scope.fromRoot();
        return await this.execute(AST, rootScope);
    }

    protected async execute(node: EST.BaseNode, scope: Scope) {
        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);
        if (!executor) {
            throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type);
        }

        return await executor.bind(this)(node, scope);
    }
}
