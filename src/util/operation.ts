/**
 * @author WMXPY
 * @namespace Util
 * @description Operation
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Variable } from "../variable/variable";
import { error } from "./error/error";

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
            case 'in': return null;
            case 'instanceof': return null;
            case '|': return null;
        }

        return null;
    };

export const getUpdateOperation
    = (symbol: EST.UpdateOperator)
        : ((value: any) => any) | null => {

        switch (symbol) {

            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            case '++': return (value: any) => value + 1;
            case '--': return (value: any) => value - 1;
        }

        return null;
    };

export const getLogicalOperation
    = (symbol: EST.LogicalOperator)
        : ((left: any, right: any) => any) | null => {

        switch (symbol) {

            case '&&': return (left: any, right: any) => left && right;
            case '||': return (left: any, right: any) => left || right;
        }

        return null;
    };

export const getAssignmentOperation
    = (symbol: EST.AssignmentOperator)
        : ((variable: Variable<any>, value: any) => any) | null => {

        switch (symbol) {

            case '%=': return null;
            case '&=': return null;
            case '**=': return null;
            case '*=': return (variable: Variable<any>, value: any) => variable.set(variable.get() * value);
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            case '+=': return (variable: Variable<any>, value: any) => variable.set(variable.get() + value);
            case '-=': return (variable: Variable<any>, value: any) => variable.set(variable.get() - value);
            case '/=': return (variable: Variable<any>, value: any) => {
                if (value === 0) {
                    throw error(ERROR_CODE.CANNOT_DIVIDE_BY_ZERO, symbol);
                }
                return variable.set(variable.get() / value);
            };
            case '<<=': return null;
            case '=': return (variable: Variable<any>, value: any) => variable.set(value);
            case '>>=': return null;
            case '>>>=': return null;
            case '^=': return null;
            case '|=': return null;
        }

        return null;
    };
