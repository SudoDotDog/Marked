/**
 * @author WMXPY
 * @namespace Parse
 * @description Native To Sand
 */

import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { extractSandToNative } from "./sand-to-native";

export const parseNativeToSand = (target: any): string | number | boolean | undefined | null | ((...args: any[]) => any) | SandMap<any> | SandList<any> => {

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

    if (typeof target === 'function') {
        return (...args) => {
            const parsedArgs: any = [];
            for (const arg of args) {
                parsedArgs.push(extractSandToNative(arg));
            }
            return target(...parsedArgs);
        };
    }

    if (Array.isArray(target)) {

        const list: SandList<any> = new SandList();
        for (const element of target) {
            list.push(parseNativeToSand(element));
        }

        return list;
    }

    if (typeof target === 'object') {

        const map: SandMap<any> = new SandMap();
        for (const key of Object.keys(target)) {
            map.set(key, parseNativeToSand(target[key]));
        }
        return map;
    }

    throw error(ERROR_CODE.INTERNAL_ERROR, 'Invalid Type');
};
