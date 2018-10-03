/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

export enum ERROR_CODE {
    UNKNOWN_ERROR = 1000,
    UNMOUNTED_AST_TYPE = 6001,
    INTERNAL_ERROR = 9001,
}

export const errorList: {
    [key: number]: string;
} = {
    1000: 'Unknown error',
    6001: 'Unmounted ast type',
    9001: 'Internal error',
};

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE, info?: string): Error => {
    const newError: Error = new Error();
    if (errorList[code]) {
        newError.message = code + ': ' + errorList[code] + (info ? (' - ' + info) : '');
        newError.name = errorList[code];
        (newError as any).code = code;

        return newError;
    }
    newError.message = code + ': ' + errorList[9001] + info ? (' - ' + info) : '';
    newError.name = errorList[9001];
    (newError as any).code = 9001;

    if ((newError as any).code > 9001) {
        console.log(newError);
    }

    return newError;
};
