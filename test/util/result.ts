/**
 * @author WMXPY
 * @namespace Util
 * @description Result
 * @override Test
 */

export const removeTimeStamps = (
    result: any,
): any => {

    delete result.startTime;
    delete result.endTime;
    delete result.duration;

    return result;
};
