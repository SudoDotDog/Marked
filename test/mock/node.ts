/**
 * @author WMXPY
 * @namespace Mock
 * @description Node
 */

import * as EST from "estree";

export const literal = (value: string | boolean | number | null): EST.Literal => {
    return {
        type: 'Literal',
        value,
    };
};
