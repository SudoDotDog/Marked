/**
 * @author WMXPY
 * @namespace Util
 * @description Option
 */

import { ISandboxOptions } from "marked#declare/variable";

export const getDefaultSandboxOption = (): ISandboxOptions => ({
    maxExpression: 100,
    maxForLoopLimit: 50,
    maxWhileLoopLimit: 50,
});
