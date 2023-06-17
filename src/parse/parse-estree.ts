/**
 * @author WMXPY
 * @namespace Parse
 * @description Parse ESTree
 */

import * as Acorn from 'acorn';
import * as EST from "estree";

export const parseCodeToESTree = (sourceCode: string): EST.Node => {

    const AST: EST.Node = Acorn.Parser.parse(sourceCode, {

        locations: true,
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        allowHashBang: true,
        sourceType: 'module',
        ecmaVersion: 'latest',
    }) as EST.Node;

    return AST;
};
