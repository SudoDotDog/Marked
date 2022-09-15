/**
 * @author WMXPY
 * @namespace Util
 * @description Wrap Member Function
 */

import { Sandbox } from "../marked/sandbox";

// eslint-disable-next-line @typescript-eslint/ban-types
export const wrapMemberFunction = <T extends Function>(sandbox: Sandbox, func: T): T => {

    if (sandbox.usingAdditionalArgument) {

        const newFunction: T = ((_additionalArgument: any, ...args: any[]) => {
            return func(...args);
        }) as any as T;

        return newFunction;
    }
    return func;
};
