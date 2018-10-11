/**
 * @author WMXPY
 * @namespace Util
 * @description Option
 */

import { ISandboxOptions } from "marked#declare/variable";

export const getDefaultSandboxOption = (): ISandboxOptions => ({
    maxExpression: 360,
    maxForLoopLimit: 42,
    maxWhileLoopLimit: 42,
});
