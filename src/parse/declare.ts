/**
 * @author WMXPY
 * @namespace Parse
 * @description Declare
 */

import * as EST from "estree";

export enum PARSE_ESTREE_COMMENT_TYPE {

    LINE = "LINE",
    BLOCK = "BLOCK",
    HASH_BANG = "HASH_BANG",
}

export type ParseESTreeComment = {

    readonly type: PARSE_ESTREE_COMMENT_TYPE;
    readonly text: string;
    readonly start: number;
    readonly end: number;
};

export type ParseESTreeResult = {

    readonly estree: EST.Node;
    readonly comments: ParseESTreeComment[];
};
