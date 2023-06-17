/**
 * @author WMXPY
 * @namespace Parse
 * @description Parse ESTree
 */

import * as Acorn from 'acorn';
import * as EST from "estree";
import { PARSE_ESTREE_COMMENT_TYPE, ParseESTreeComment, ParseESTreeResult } from './declare';

export const parseCodeToESTree = (sourceCode: string): ParseESTreeResult => {

    const comments: ParseESTreeComment[] = [];
    const hasHashBang: boolean = sourceCode.startsWith('#!');

    const AST: EST.Node = Acorn.Parser.parse(sourceCode, {

        locations: true,
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        allowHashBang: true,
        onComment: (
            block: boolean,
            text: string,
            start: number,
            end: number,
        ) => {

            if (hasHashBang && start === 0) {

                comments.push({
                    type: PARSE_ESTREE_COMMENT_TYPE.HASH_BANG,
                    text,
                    start,
                    end,
                });
                return;
            }

            comments.push({
                type: block ? PARSE_ESTREE_COMMENT_TYPE.BLOCK : PARSE_ESTREE_COMMENT_TYPE.LINE,
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
