/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Chain Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountChainExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ChainExpression', chainExpressionEvaluator);
};

export const chainExpressionEvaluator: Evaluator<'ChainExpression'> =
    async function (this: Sandbox, node: EST.ChainExpression, scope: Scope, trace: Trace): Promise<any> {

        return await this.execute(node.expression, scope, trace);
    };
