/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { getUnaryOperation } from "../operation/unary";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountUnaryExpression = (sandbox: ISandbox): void => {

    sandbox.mount("UnaryExpression", unaryExpressionEvaluator);
};

export const unaryExpressionEvaluator: Evaluator<"UnaryExpression"> =
    async function (this: Sandbox, node: EST.UnaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const evalValue: () => Promise<any> = async () => await this.execute(node.argument, scope, nextTrace);
        const value: any = await evalValue();

        const operation: ((valueArg: any) => any) | null = getUnaryOperation(node.operator);
        if (operation === null) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator, node, trace);
        }

        return operation(value);
    };
