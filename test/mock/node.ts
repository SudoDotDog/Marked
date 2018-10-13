/**
 * @author WMXPY
 * @namespace Mock
 * @description Node
 */

import * as EST from "estree";

export const createLiteral = (value: string | boolean | number | null): EST.Literal => {
    return {
        type: 'Literal',
        value,
    };
};

export const mockLLiteralEvaluator = (node: EST.Literal) => {
    return node.value;
};

export const createIdentifier = (name: string): EST.Identifier => {
    return {
        type: 'Identifier',
        name,
    };
};

export interface IMockedClass {
    reset(): void;
}
