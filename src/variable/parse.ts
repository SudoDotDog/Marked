/**
 * @author WMXPY
 * @namespace Variable
 * @description Parse
 */

import { ERROR_CODE } from "../declare/error";
import { error } from "../util/error/error";
import { SandList } from "./sandlist";
import { SandMap } from "./sandmap";

export const extractSandToNative = (target: any): any => {

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
        return target;
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

    throw error(ERROR_CODE.INTERNAL_ERROR, 'Invalid Type');
};

export const parseNativeToSand = (target: any): string | number | boolean | ((...args: any[]) => any) | SandMap<any> | SandList<any> => {

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
