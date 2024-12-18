/**
 * @author WMXPY
 * @namespace Util
 * @description Option
 */

import { ISandboxOptions } from "../declare/sandbox";
import { New_Line_Character } from "../host/declare";

export const getDefaultSandboxOption = (): ISandboxOptions => ({

    duration: 0,
    maxCodeLength: 4096,
    maxExpression: 16384,
    maxForLoopLimit: 128,
    maxWhileLoopLimit: 128,
});

export const getRawCode = (script: string): string => {

    const rawCode: string =
        getCommentRemovedCode(script)
            .split(New_Line_Character)
            .map((str: string) => str.trim())
            .filter((str: string) => Boolean(str))
            .join("");
    return rawCode;
};

export const getRawCodeLength = (script: string): number => {

    return getRawCode(script).length;
};

export const getCommentRemovedCode = (script: string): string => {

    const regExp: RegExp = /(\/\/.*)|(\/\*[\s\S]*?\*\/)/g;
    return script.replace(regExp, "");
};

export const awaitableSleep = (time: number): Promise<void> => {

    return new Promise((resolve: () => void) => {

        setTimeout(() => resolve, time);
    });
};
