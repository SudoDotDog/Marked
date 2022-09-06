/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Binary Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { executeInBinaryOperator } from "../operation/binary-expression/in";
import { executeInstanceOfBinaryOperator } from "../operation/binary-expression/instance-of";
import { getBinaryOperation } from "../operation/binary-expression/operators";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountBinaryExpression = (sandbox: ISandbox): void => {

    sandbox.mount('BinaryExpression', binaryExpressionEvaluator);
};

export const binaryExpressionEvaluator: Evaluator<'BinaryExpression'> =
    async function (this: Sandbox, node: EST.BinaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope, nextTrace);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope, nextTrace);

        if (node.operator === 'in') {

            const bindingExecuteInBinaryOperator = executeInBinaryOperator.bind(this);
            return bindingExecuteInBinaryOperator(node.left, node.right, scope, nextTrace);
        }

        if (node.operator === 'instanceof') {

            const bindingExecuteInstanceOfBinaryOperator = executeInstanceOfBinaryOperator.bind(this);
            return bindingExecuteInstanceOfBinaryOperator(node.left, node.right, scope, nextTrace);
        }

        const operation: ((left: any, right: any) => any) | null =
            getBinaryOperation(node.operator);

        if (!operation) {
            throw error(ERROR_CODE.BINARY_NOT_SUPPORT, node.operator, node, trace);
        }

        const left: any = await evalLeft();
        const right: any = await evalRight();

        return operation(left, right);
    };
