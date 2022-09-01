/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { getUnaryOperation } from "../operation/unary";
import { error } from "../util/error/error";
import { rummageSpecialKeyword } from "../util/hack";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const mountUnaryExpression = (sandbox: Sandbox): void => {

    sandbox.mount('UnaryExpression', unaryExpressionEvaluator);
};

export const unaryExpressionEvaluator: Evaluator<'UnaryExpression'> =
    async function (this: Sandbox, node: EST.UnaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const evalValue: () => Promise<any> = async () => await this.execute(node.argument, scope, nextTrace);
        const value: any = await evalValue();

        if (rummageSpecialKeyword(node.operator, value, scope, this)) {
            return value;
        }

        const operation: ((valueArg: any) => any) | null = getUnaryOperation(node.operator);
        if (operation === null) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator, node, trace);
        }

        return operation(value);
    };
