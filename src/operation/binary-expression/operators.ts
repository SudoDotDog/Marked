/**
 * @author WMXPY
 * @namespace Operation_BinaryExpression
 * @description Operators
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";

export const getBinaryOperation
    = (symbol: EST.BinaryOperator)
        : ((left: any, right: any) => any) | null => {

        switch (symbol) {

            case '!=': return null;
            case '!==': return (left: any, right: any) => left !== right;
            case '%': return (left: any, right: any) => left % right;
            case '&': return null;
            case '*': return (left: any, right: any) => left * right;
            case '**': return null;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            case '+': return (left: any, right: any) => left + right;
            case '-': return (left: any, right: any) => left - right;
            case '/': return (left: any, right: any) => {
                if (right === 0) {
                    throw error(ERROR_CODE.CANNOT_DIVIDE_BY_ZERO, symbol);
                }
                return left / right;
            };
            case '<': return (left: any, right: any) => left < right;
            case '<<': return null;
            case '<=': return (left: any, right: any) => left <= right;
            case '==': return null;
            case '===': return (left: any, right: any) => left === right;
            case '>': return (left: any, right: any) => left > right;
            case '>=': return (left: any, right: any) => left >= right;
            case '>>': return null;
            case '>>>': return null;
            case '^': return null;
            case '|': return null;
        }

        return null;
    };
