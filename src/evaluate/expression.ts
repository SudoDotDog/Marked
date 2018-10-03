/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { EVALUATE_FUNC, EXPRESSION_TYPE } from "marked#declare/evaluate";
import { IExecuter } from "marked#declare/expression";

export class Executer implements IExecuter {
    private _map: Map<EXPRESSION_TYPE, EVALUATE_FUNC<EST.Node>>;

    public constructor() {
        this._map = new Map<EXPRESSION_TYPE, EVALUATE_FUNC<EST.Node>>();
    }

    public mount(func: EVALUATE_FUNC<EST.Node>): IExecuter {
        return this;
    }

    public execute(node: EST.Node) {

    }
}
