/**
 * @author WMXPY
 * @namespace Util
 * @description Unary
 */

import * as EST from "estree";

export const getUnaryOperation = (symbol: EST.UnaryOperator): ((value: any) => any) | null => {
    switch (symbol) {
        case '!': return (value: any) => !Boolean(value);
        case '+':
        case '-':
        case 'delete':
        case 'typeof':
        case 'void':
        case '~': return null;
    }
};

