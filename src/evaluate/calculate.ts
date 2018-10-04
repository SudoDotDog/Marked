/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { getBinaryOperator } from "marked#util/binary";
import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const binaryExpressionEvaluator: Evaluator<'BinaryExpression'> =
    async function (this: Sandbox, node: EST.BinaryExpression, scope: Scope): Promise<any> {

        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope);

        const operation: ((left: any, right: any) => any) | null = getBinaryOperator(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.BINARY_NOT_SUPPORT, node.operator);
        }

        return operation(await evalLeft(), await evalRight());
    };
