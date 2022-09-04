/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Result
 * @override Test
 */

import { END_SIGNAL, IMarkedResultException, IMarkedResultFailed, IMarkedResultSucceed, IMarkedResultTerminated, MarkedResult } from "../../src/declare/evaluate";

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

export const assertExceptionMarkedResult: (
    result: MarkedResult,
) => asserts result is IMarkedResultException = (
    result: MarkedResult,
): asserts result is IMarkedResultException => {

        if (result.signal !== END_SIGNAL.EXCEPTION) {
            console.log(result);
            throw new Error('Invalid marked result');
        }
        return;
    };

export const assertTerminatedMarkedResult: (
    result: MarkedResult,
) => asserts result is IMarkedResultTerminated = (
    result: MarkedResult,
): asserts result is IMarkedResultTerminated => {

        if (result.signal !== END_SIGNAL.TERMINATED) {
            console.log(result);
            throw new Error('Invalid marked result');
        }
        return;
    };
