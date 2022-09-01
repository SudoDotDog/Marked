/**
 * @author WMXPY
 * @namespace Util
 * @description Operation
 */

import * as EST from "estree";
import { Variable } from "../variable/variable";

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
