/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Declare
 */

import { MarkedNativeClassInstance } from "./native-class-instance";

export type MarkedNativeClassConstructor =
    (...args: any[]) => MarkedNativeClassInstance;
