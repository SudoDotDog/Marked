/**
 * @author WMXPY
 * @namespace Debug
 * @description Node
 */

import { EST_TYPE } from "../declare/types";

const Debug_Skip_Node: Set<EST_TYPE> = new Set([
    "BlockStatement",
    "Literal",
    "Program",
] as EST_TYPE[]);

export const shouldDebugNode = (type: EST_TYPE): boolean => {

    return !Debug_Skip_Node.has(type);
};
