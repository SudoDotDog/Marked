/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountExpressionStatement = (sandbox: ISandbox): void => {

    sandbox.mount("ExpressionStatement", expressionStatementEvaluator);
};

export const expressionStatementEvaluator: Evaluator<"ExpressionStatement"> =
    async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        return await this.execute(node.expression, scope, nextTrace);
    };
