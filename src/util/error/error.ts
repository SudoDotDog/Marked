/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

import * as EST from "estree";
import { ERROR_CODE, ERROR_LIST } from "marked#declare/error";

export class MarkedError extends Error {

    public code: number;
    public description: string;

    public info: string | null;
    public node: EST.Node | null;

    public constructor(code: number, description: string, info?: string, node?: EST.Node) {

        super();

        this.code = code;
        this.description = description;

        this.info = info || null;
        this.node = node || null;
    }
}

export const error = (code: ERROR_CODE, info?: string, node?: EST.Node): MarkedError => {

    const newError: MarkedError = Boolean(ERROR_LIST[code])
        ? new MarkedError(code, ERROR_LIST[code], info, node)
        : new MarkedError(ERROR_CODE.INTERNAL_ERROR, ERROR_LIST[ERROR_CODE.INTERNAL_ERROR], info, node);

    if (newError.code > 9001) console.log(newError);
    return newError;
};
