/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { getBinaryOperation } from "marked#util/binary";
import { error, ERROR_CODE } from "marked#util/error";
import { getUnaryOperation } from "marked#util/unary";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const binaryExpressionEvaluator: Evaluator<'BinaryExpression'> =
    async function (this: Sandbox, node: EST.BinaryExpression, scope: Scope): Promise<any> {

        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope);

        const operation: ((left: any, right: any) => any) | null = getBinaryOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.BINARY_NOT_SUPPORT, node.operator);
        }

        return operation(await evalLeft(), await evalRight());
    };

export const unaryExpressionEvaluator: Evaluator<'UnaryExpression'> =
    async function (this: Sandbox, node: EST.UnaryExpression, scope: Scope): Promise<any> {

        const evalValue: () => Promise<any> = async () => await this.execute(node.argument, scope);

        const operation: ((value: any) => any) | null = getUnaryOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator);
        }

        return operation(await evalValue());
    };
