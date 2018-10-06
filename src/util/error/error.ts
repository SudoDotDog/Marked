/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

import * as EST from "estree";
import { ERROR_CODE, ERROR_LIST } from "marked#declare/error";

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE, info?: string, node?: EST.Node): Error => {
    const newError: Error = new Error();
    if (ERROR_LIST[code]) {
        newError.message = code + ': ' + ERROR_LIST[code] + (info ? (' - ' + info) : '' + (node || ''));
        newError.name = ERROR_LIST[code];
        (newError as any).code = code;

        return newError;
    }
    newError.message = code + ': ' + ERROR_LIST[code] + (info ? (' - ' + info) : '' + (node || ''));
    newError.name = ERROR_LIST[9001];
    (newError as any).code = 9001;

    if ((newError as any).code > 9001) {
        console.log(newError);
    }

    return newError;
};
