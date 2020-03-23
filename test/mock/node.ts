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

export const mockLLiteralEvaluator: any = (node: EST.Literal) => {

    return node.value;
};

export const mockLIdentifierEvaluator = (node: EST.Identifier) => {

    return node.name;
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
