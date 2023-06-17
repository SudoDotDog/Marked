/**
 * @author WMXPY
 * @namespace Parse
 * @description Parse ESTree
 */

import * as Acorn from 'acorn';
import * as EST from "estree";

export type ParseESTreeComment = {

    readonly block: boolean;
    readonly text: string;
    readonly start: number;
    readonly end: number;
};

export type ParseESTreeResult = {

    readonly estree: EST.Node;
    readonly comments: ParseESTreeComment[];
};

export const parseCodeToESTree = (sourceCode: string): ParseESTreeResult => {

    const comments: ParseESTreeComment[] = [];

    const AST: EST.Node = Acorn.Parser.parse(sourceCode, {

        locations: true,
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        allowHashBang: true,
        onComment: (block: boolean, text: string, start: number, end: number) => {
            comments.push({
                block,
                text,
                start,
                end,
            });
        },
        sourceType: 'module',
        ecmaVersion: 'latest',
    }) as EST.Node;

    return {
        estree: AST,
        comments,
    };
};
