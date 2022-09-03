/**
 * @author WMXPY
 * @namespace Operation
 * @description Unary
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { error } from "../util/error/error";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";

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
        case 'typeof': return (value: any) => {
            if (value === null) {
                return 'null';
            }
            if (value instanceof SandFunction) {
                return 'function';
            }
            if (value instanceof SandList) {
                return 'array';
            }
            return typeof value;
        };
        case 'void': return null;
        case '~': return null;
    }

    return null;
};
