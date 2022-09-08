/**
 * @author WMXPY
 * @namespace Parse
 * @description Native To Sand
 */

import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { typeCheckIsConstructor } from "../util/type-check";
import { SandList } from "../variable/sand-list";
import { SandLiteralBigInt } from "../variable/sand-literal/bigint";
import { SandLiteralRegExp } from "../variable/sand-literal/regexp";
import { SandMap } from "../variable/sand-map";
import { extractSandToNative } from "./sand-to-native";

export const parseNativeToSand = (target: any):
    | string
    | number
    | boolean
    | undefined
    | null
    | ((...args: any[]) => any)
    | SandLiteralBigInt
    | SandLiteralRegExp
    | SandMap<any>
    | SandList<any> => {

    if (typeof target === 'undefined') {
        return undefined;
    }
    if (target === null) {
        return null;
    }

    if (typeof target === 'string') {
        return target;
    }
    if (typeof target === 'number') {
        return target;
    }
    if (typeof target === 'boolean') {
        return target;
    }

    if (typeof target === 'bigint') {

        const sandBitInt: SandLiteralBigInt = SandLiteralBigInt.create(target.toString());
        return sandBitInt;
    }

    if (Array.isArray(target)) {

        const list: SandList<any> = SandList.create();
        for (const element of target) {
            list.push(parseNativeToSand(element));
        }

        return list;
    }

    if (target instanceof RegExp) {

        return SandLiteralRegExp.create(target.source, target.flags);
    }

    if (typeof target === 'object') {

        if (target.constructor && target.constructor.name !== 'Object') {

            throw error(
                ERROR_CODE.CANNOT_TRANSFER_NATIVE_TO_CLASS_INSTANCE,
                target.constructor.name,
            );
        }

        const map: SandMap<any> = new SandMap();
        for (const key of Object.keys(target)) {
            map.set(key, parseNativeToSand(target[key]));
        }
        return map;
    }

    if (typeCheckIsConstructor(target)) {
        throw error(ERROR_CODE.CANNOT_TRANSFER_NATIVE_TO_CLASS, target);
    }

    if (typeof target === 'function') {

        return (...args) => {
            const parsedArgs: any = [];
            for (const arg of args) {
                parsedArgs.push(extractSandToNative(arg));
            }
            return target(...parsedArgs);
        };
    }

    throw error(ERROR_CODE.INTERNAL_ERROR, 'Invalid Type');
};