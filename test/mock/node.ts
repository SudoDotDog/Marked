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

export const literalEvaluator = (node: EST.Literal) => {
    return node.value;
};

export const identifier = (name: string): EST.Identifier => {
    return {
        type: 'Identifier',
        name,
    };
};

export interface IMockedClass {
    reset(): void;
}
