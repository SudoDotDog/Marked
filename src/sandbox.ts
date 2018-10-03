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

export class Sandbox {

    private _map: Map<EST_TYPE, Evaluator<EST_TYPE>>;
    private _rootScope: Scope;

    public constructor() {

        this._map = new Map<EST_TYPE, Evaluator<EST_TYPE>>();
        this._rootScope = Scope.fromRoot();
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

        const AST: EST.BaseNode = Acorn.parse(script);
        const rootScope: Scope = Scope.fromScope(this._rootScope);
        return await this.execute(AST, rootScope);
    }

    protected async execute(node: EST.BaseNode, scope: Scope): Promise<any> {

        const executor: Evaluator<EST_TYPE> | undefined = this._map.get(node.type as EST_TYPE);
        if (!executor) throw error(ERROR_CODE.UNMOUNTED_AST_TYPE, node.type);

        return await executor.bind(this)(node, scope);
    }
}
