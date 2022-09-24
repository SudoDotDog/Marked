/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Declare
 */

import { ISandbox } from "../../declare/sandbox";
import { MarkedNativeClassInstance } from "./native-class-instance";

export type MarkedNativeClassConstructor =
    (...args: any[]) => MarkedNativeClassInstance;

export type MarkedNativeClassGetStaticMemberFunction =
    (name: string, sandbox: ISandbox) => any;

export const defaultMarkedNativeClassGetStaticMemberFunction = (): any => {
    return undefined;
};

export type MarkedNativeClassToNativeFunction = () => any;

export const defaultMarkedNativeClassToNativeFunction = (): any => {
    return "[Marked Native Class]";
};
