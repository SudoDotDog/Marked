/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Logical Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { getLogicalOperation } from "../operation/logical";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountLogicalExpression = (sandbox: ISandbox): void => {

    sandbox.mount("LogicalExpression", logicalExpressionEvaluator);
};

export const logicalExpressionEvaluator: Evaluator<"LogicalExpression"> =
    async function (this: Sandbox, node: EST.LogicalExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope, nextTrace);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope, nextTrace);

        const operation: ((left: any, right: any) => any) | null = getLogicalOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.LOGICAL_NOT_SUPPORT, node.operator, node, trace);
        }

        return operation(await evalLeft(), await evalRight());
    };
