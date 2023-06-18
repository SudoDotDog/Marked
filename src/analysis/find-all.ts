/**
 * @author WMXPY
 * @namespace Analysis
 * @description Find All
 */

import { Node } from "acorn";
import { full } from "acorn-walk";
import { EST_TYPE, IESTreeType } from "../declare/types";

export const findAllESTNodes = <T extends EST_TYPE>(
    estree: any,
    type: T,
): Array<IESTreeType[T]> => {

    const results: Array<IESTreeType[T]> = [];

    full(
        estree,
        (node: Node, _state: any, nodeType: string) => {
            if (nodeType === type) {
                results.push(node as any);
            }
        },
    );

    return results;
};
