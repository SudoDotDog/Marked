/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Result
 * @override Test
 */

import { END_SIGNAL, IMarkedResultFailed, IMarkedResultSucceed, MarkedResult } from "../../src/declare/evaluate";

export const assertSucceedMarkedResult: (
    result: MarkedResult,
) => asserts result is IMarkedResultSucceed = (
    result: MarkedResult,
): asserts result is IMarkedResultSucceed => {

        if (result.signal !== END_SIGNAL.SUCCEED) {
            console.log(result);
            throw new Error('Invalid marked result');
        }
        return;
    };

export const assertFailedMarkedResult: (
    result: MarkedResult,
) => asserts result is IMarkedResultFailed = (
    result: MarkedResult,
): asserts result is IMarkedResultFailed => {

        if (result.signal !== END_SIGNAL.FAILED) {
            console.log(result);
            throw new Error('Invalid marked result');
        }
        return;
    };
