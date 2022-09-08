/**
 * @author WMXPY
 * @namespace Parse
 * @description Sand To Native
 */

import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
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

    if (target instanceof SandClass) {

        throw error(ERROR_CODE.CANNOT_TRANSFER_CLASS_TO_NATIVE);
    }

    if (target instanceof SandFunction) {

        throw error(ERROR_CODE.CANNOT_TRANSFER_FUNCTION_TO_NATIVE);
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
