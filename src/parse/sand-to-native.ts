/**
 * @author WMXPY
 * @namespace Parse
 * @description Sand To Native
 */

import { MarkedNativeClass } from "../variable/native-class/native-class";
import { MarkedNativeClassInstance } from "../variable/native-class/native-class-instance";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";
import { SandLiteralBigInt } from "../variable/sand-literal/bigint";
import { SandLiteralRegExp } from "../variable/sand-literal/regexp";
import { SandMap } from "../variable/sand-map";

export const extractSandToNative = (target: any): any => {

    if (target instanceof SandLiteralBigInt) {

        return target.toNativeBigInt();
    }

    if (target instanceof SandLiteralRegExp) {

        return target.toNativeRegExp();
    }

    if (target instanceof MarkedNativeClass) {

        return extractSandToNative(target.toNative());
    }

    if (target instanceof MarkedNativeClassInstance) {

        return extractSandToNative(target.toNative());
    }

    if (target instanceof SandClass) {

        return extractSandToNative(target.toNative());
    }

    if (target instanceof SandClassInstance) {

        return extractSandToNative(target.toNative());
    }

    if (target instanceof SandFunction) {

        return target.execute.bind(target);
    }

    if (target instanceof SandList) {

        const list: any[] = target.list;
        const result: any[] = [];

        for (const element of list) {
            result.push(extractSandToNative(element));
        }

        return result;
    }

    if (target instanceof SandMap) {

        const keys: string[] = target.keys();
        const result: Record<string, any> = {};

        for (const key of keys) {
            result[key] = extractSandToNative(target.get(key));
        }

        return result;
    }
    return target;
};
