/**
 * @author WMXPY
 * @namespace Util
 * @description Operation
 */

import * as EST from "estree";

export const getUnaryOperation = (symbol: EST.UnaryOperator): ((value: any) => any) | null => {

    switch (symbol) {

        case '!': return (value: any) => !Boolean(value);
        case '+':
        case '-':
        case 'delete': return null;
        case 'typeof':
        case 'void':
        case '~':
        default: return null;
    }
};


export const getBinaryOperation = (symbol: EST.BinaryOperator): ((left: any, right: any) => any) | null => {

    switch (symbol) {

        case '!=':
        case '!==': return null;
        case '%': return (left: any, right: any) => left % right;
        case '&': return null;
        case '*': return (left: any, right: any) => left * right;
        case '**': return null;
        case '+': return (left: any, right: any) => left + right;
        case '-': return (left: any, right: any) => left - right;
        case '/': return (left: any, right: any) => left / right;
        case '<':
        case '<<':
        case '<=':
        case '==':
        case '===':
        case '>':
        case '>=':
        case '>>':
        case '>>>':
        case '^':
        case 'in':
        case 'instanceof':
        case '|': return null;
    }
};

export const getUpdateOperation = (symbol: EST.UpdateOperator): ((value: any) => any) | null => {

    switch (symbol) {

        case '++': return (value: any) => value + 1;
        case '--': return (value: any) => value - 1;
    }
    return null;
};
