/**
 * @author WMXPY
 * @namespace Analysis
 * @description Find One
 */

import { Node } from "acorn";
import { full } from "acorn-walk";
import { EST_TYPE, IESTreeType } from "../declare/types";

const FOUND_MESSAGE: string = 'Found';

export const findOneESTNodeOrNull = <T extends EST_TYPE>(
    estree: any,
    type: T,
): IESTreeType[T] | null => {

    let result: IESTreeType[T] | null = null;

    try {

        full(
            estree,
            (node: Node, _state: any, nodeType: string) => {
                if (nodeType === type) {
                    result = node as any;
                    throw new Error(FOUND_MESSAGE);
                }
            },
        );

        return null;
    } catch (err) {

        if ((err as any).message === FOUND_MESSAGE) {
            return result;
        }
        throw err;
    }
};
