/**
 * @author WMXPY
 * @namespace Util
 * @description Option
 */

import { ISandboxOptions } from "marked#declare/variable";

export const getDefaultSandboxOption = (): ISandboxOptions => ({

    maxCodeLength: 1250,
    maxExpression: 360,
    maxForLoopLimit: 42,
    maxWhileLoopLimit: 42,
});

export const getRawCodeLength = (script: string): number => {

    const trimmed: string = script
        .split('\n')
        .map((str: string) => str.trim())
        .filter((str: string) => Boolean(str))
        .join('');

    return trimmed.length;
};
