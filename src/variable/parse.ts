/**
 * @author WMXPY
 * @namespace Variable
 * @description Parse
 */

import { SandList } from "./sandlist";
import { SandMap } from "./sandmap";

export const parseNativeToSand = (target: any): string | number | boolean | SandMap<any> | SandList<any> => {

    if (typeof target === 'string') {
        return target;
    }
    if (typeof target === 'number') {
        return target;
    }
    if (typeof target === 'boolean') {
        return target;
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

    return target;
};
