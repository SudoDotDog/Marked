/**
 * @author WMXPY
 * @namespace Util
 * @description Resolve
 */

import { SandList } from "../variable/sandlist";
import { SandMap } from "../variable/sandmap";

export const resolveSandMap = <T = any>(obj: SandMap<T>): {
    [key: string]: T;
} => {

    return {};
};

export const resolveSandList = <T = any>(obj: SandList<T>): T[] => {

    return [];
};
