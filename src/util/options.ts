/**
 * @author WMXPY
 * @namespace Util
 * @description Option
 */

import { ISandboxOptions } from "../declare/sandbox";

export const getDefaultSandboxOption = (): ISandboxOptions => ({

    maxCodeLength: 1250,
    maxExpression: 360,
    maxForLoopLimit: 42,
    maxWhileLoopLimit: 42,
});

export const getRawCode = (script: string): string => {

    const rawCode: string =
        getCommentRemovedCode(script)
            .split('\n')
            .map((str: string) => str.trim())
            .filter((str: string) => Boolean(str))
            .join('');
    return rawCode;
};

export const getRawCodeLength =
    (script: string): number =>
        getRawCode(script).length;

export const getCommentRemovedCode = (script: string): string => {

    const regExp: RegExp = /(\/\/.*)|(\/\*[\s\S]*?\*\/)/g;
    return script.replace(regExp, '');
};
