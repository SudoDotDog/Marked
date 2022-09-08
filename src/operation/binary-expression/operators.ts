/**
 * @author WMXPY
 * @namespace Operation_BinaryExpression
 * @description Operators
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { createPerformBinaryExpressionOnNumber, createPerformBinaryExpressionOnNumberOrString } from "./perform";

export const getBinaryOperation = (
    symbol: EST.BinaryOperator
): ((left: any, right: any) => any) | null => {

    switch (symbol) {

        case '!=': return null;
        case '!==': return (left: any, right: any) => {
            return left !== right;
        };
        case '%': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left % right;
        });
        case '&': return null;
        case '*': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left * right;
        });
        case '**': return null;
        case '+': return createPerformBinaryExpressionOnNumberOrString((left: any, right: any) => {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            return left + right;
        });
        case '-': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left - right;
        });
        case '/': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            if (right === 0) {
                throw error(ERROR_CODE.CANNOT_DIVIDE_BY_ZERO, symbol);
            }
            return left / right;
        });
        case '<': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left < right;
        });
        case '<<': return null;
        case '<=': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left <= right;
        });
        case '==': return null;
        case '===': return (left: any, right: any) => {
            return left === right;
        };
        case '>': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left > right;
        });
        case '>=': return createPerformBinaryExpressionOnNumber((left: any, right: any) => {
            return left >= right;
        });
        case '>>': return null;
        case '>>>': return null;
        case '^': return null;
        case '|': return null;
    }

    return null;
};
