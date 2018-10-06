/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

import * as EST from "estree";
import { ERROR_CODE, ERROR_LIST } from "marked#declare/error";

export class MarkedError extends Error {

    private _code: number;
    private _description: string;

    private _info: string | null;
    private _node: EST.Node | null;

    public constructor(code: number, description: string) {

        super();

        this._code = code;
        this._description = description;

        this._info = null;
        this._node = null;
    }

    public get code(): number {
        return this._code;
    }

    public get message(): string {

        const body: string = this._code + ': ' + this._description;
        return body + (this._info ? (' - ' + this._info) : "");
    }

    public get node(): EST.Node | null {
        return this._node;
    }

    public setInfo(info: string): MarkedError {

        this._info = info;
        return this;
    }

    public setNode(node: EST.Node): MarkedError {

        this._node = node;
        return this;
    }
}

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE, info?: string, node?: EST.Node): MarkedError => {


    const newError: MarkedError = Boolean(ERROR_LIST[code])
        ? new MarkedError(code, ERROR_LIST[code])
        : new MarkedError(ERROR_CODE.INTERNAL_ERROR, ERROR_LIST[ERROR_CODE.INTERNAL_ERROR]);

    if (info) newError.setInfo(info);
    if (node) newError.setNode(node);

    if (newError.code > 9001) {

        console.log(newError);
    }

    return newError;
};
