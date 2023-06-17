/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Return
 * @override Test
 */

import { MarkedResultSucceedRootReturn, MarkedResultSucceedRootReturnHas } from "../../src/declare/evaluate";

export const assertMarkedResultHasRootReturn: (
    result: MarkedResultSucceedRootReturn,
) => asserts result is MarkedResultSucceedRootReturnHas = (
    result: MarkedResultSucceedRootReturn,
): asserts result is MarkedResultSucceedRootReturnHas => {

        if (result.hasRootReturn) {
            console.log(result);
            throw new Error('Invalid marked root return result');
        }
        return;
    };
