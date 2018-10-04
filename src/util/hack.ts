/**
 * @author WMXPY
 * @namespace Util
 * @description Hack
 */

import { TokenType } from "acorn";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "sandbox";

export const insertKeywordToRegExp = (keywords: string, newKeyword: string): string => {

    const trimmed: string = keywords.substring(1, keywords.length - 1);
    const currents: RegExpMatchArray | null = trimmed.match(/[a-z]+/g);
    const currentArray: string[] = currents ? [...currents, newKeyword] : [newKeyword];

    const newRegexp: string = '^(?:' + currentArray.join('|') + ')$';
    return newRegexp;
};

export const createKeywordType = (keyword: string): TokenType => {

    return {

        label: keyword,
        keyword,
        beforeExpr: false,
        startsExpr: false,
        isLoop: false,
        isAssign: false,
        prefix: true,
        postfix: false,
        binop: null as any,
        updateContext: null as any,
    };
};

export const rummageSpecialKeyword = (keyword: string, value: any, scope: Scope, sandbox: Sandbox): boolean => {

    if (keyword === 'sandbox') {

        specialConfig(sandbox, value);
        return true;
    } else if (keyword === 'scope') {

        specialConfig(scope, value);
        return true;
    }
    return false;
};

export const specialConfig = (clazz: Scope | Sandbox, value: any): void => {

    clazz.config(value);
};
