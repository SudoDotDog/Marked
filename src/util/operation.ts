/**
 * @author WMXPY
 * @namespace Util
 * @description Operation
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Variable } from "../variable/variable";
import { error } from "./error/error";

export const getUnaryOperation = (symbol: EST.UnaryOperator): ((value: any) => any) | null => {

    switch (symbol) {

        case '!': return (value: any) => !Boolean(value);
        case '+': return null;
        case '-': return (value: any) => {
            if (typeof value === 'number' && !isNaN(value)) {
                return value * -1;
            }
            throw error(ERROR_CODE.NEGATIVE_UNARY_ONLY_AVAILABLE_FOR_VALID_NUMBER, symbol);
        };
        case 'delete': return null;
        case 'typeof': return null;
        case 'void': return null;
        case '~': return null;
    }

    return null;
};

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
            case '/': return (left: any, right: any) => left / right;
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
            case '*=': return null;
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            case '+=': return (variable: Variable<any>, value: any) => variable.set(variable.get() + value);
            case '-=': return (variable: Variable<any>, value: any) => variable.set(variable.get() - value);
            case '/=': return null;
            case '<<=': return null;
            case '=': return (variable: Variable<any>, value: any) => variable.set(value);
            case '>>=': return null;
            case '>>>=': return null;
            case '^=': return null;
            case '|=': return null;
        }

        return null;
    };
