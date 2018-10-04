/**
 * @author WMXPY
 * @namespace Util
 * @description Binary
 */

import * as EST from "estree";

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

