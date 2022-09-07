/**
 * @author WMXPY
 * @namespace Parse
 * @description Parse ESTree
 */

import * as Acorn from 'acorn';
import * as EST from "estree";

export const parseCodeToESTree = async (sourceCode: string): Promise<EST.Node> => {

    const AST: EST.Node = Acorn.Parser.parse(sourceCode, {

        locations: true,
        allowReturnOutsideFunction: false,
        allowAwaitOutsideFunction: false,
        allowHashBang: false,
        sourceType: 'module',
        ecmaVersion: 'latest',
    }) as EST.Node;

    return AST;
};
