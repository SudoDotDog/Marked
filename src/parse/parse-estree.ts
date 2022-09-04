/**
 * @author WMXPY
 * @namespace Parse
 * @description Parse ESTree
 */

import * as Acorn from 'acorn';
import * as EST from "estree";

export const parseCodeToESTree = async (sourceCode: string): Promise<EST.BaseNode> => {

    const AST: EST.BaseNode = Acorn.Parser.parse(sourceCode, {

        locations: true,
        ranges: true,
        allowReturnOutsideFunction: false,
        allowAwaitOutsideFunction: false,
        allowHashBang: false,
        sourceType: 'module',
        ecmaVersion: 'latest',
    });
    return AST;
};
