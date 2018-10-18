/**
 * @author WMXPY
 * @namespace Util_Error
 * @description Error
 */

import * as EST from "estree";
import { ERROR_CODE, ERROR_LIST } from "../../declare/error";
import { Trace } from "../../variable/trace";

export class MarkedError extends Error {

    public code: number;
    public description: string;
    public message: string;

    public info: string | null;
    public trace: Trace | null;
    public node: EST.Node | null;

    public constructor(code: number, description: string, info?: string, node?: EST.Node, trace?: Trace) {

        super();

        this.code = code;
        this.description = description;
        this.message = code + ": " + description;

        this.info = info || null;
        this.trace = trace || null;
        this.node = node || null;
    }
}

export const error = (code: ERROR_CODE, info?: string, node?: EST.Node, trace?: Trace): MarkedError => {

    const newError: MarkedError = Boolean(ERROR_LIST[code])
        ? new MarkedError(code, ERROR_LIST[code], info, node, trace)
        : new MarkedError(ERROR_CODE.INTERNAL_ERROR, ERROR_LIST[ERROR_CODE.INTERNAL_ERROR], info, node, trace);

    if (newError.code > 9001) console.log(newError);
    return newError;
};
