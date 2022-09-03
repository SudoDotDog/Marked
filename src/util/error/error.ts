/**
 * @author WMXPY
 * @namespace Util_Error
 * @description Error
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { ERROR_LIST } from "../../declare/error-list";
import { ITrace } from "../../declare/variable";

export class MarkedError extends Error {

    public code: number;
    public description: string;
    public message: string;

    public info: string | null;
    public trace: ITrace | null;
    public node: EST.Node | null;

    public constructor(code: number, description: string, info?: string, node?: EST.Node, trace?: ITrace) {

        super();

        this.code = code;
        this.description = description;
        this.message = `${code}: ${description}`;

        this.info = info || null;
        this.trace = trace || null;
        this.node = node || null;
    }
}

export const error = (code: ERROR_CODE, info?: string, node?: EST.Node, trace?: ITrace): MarkedError => {

    const newError: MarkedError = Boolean(ERROR_LIST[code])
        ? new MarkedError(code, ERROR_LIST[code], info, node, trace)
        : new MarkedError(ERROR_CODE.INTERNAL_ERROR, ERROR_LIST[ERROR_CODE.INTERNAL_ERROR], info, node, trace);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (newError.code > 9001) {
        console.log(newError);
    }
    return newError;
};
