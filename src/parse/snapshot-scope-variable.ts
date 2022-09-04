/**
 * @author WMXPY
 * @namespace Parse
 * @description Snapshot Scope Variable
 */

import { MarkedDebugSnapshotScopeVariable } from "../debug/snapshot/declare";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { Variable } from "../variable/variable";

export const parseSnapshotScopeVariable = (variable: Variable<any>): MarkedDebugSnapshotScopeVariable => {

    if (!(variable instanceof Variable)) {
        throw error(ERROR_CODE.INTERNAL_ERROR, 'Scope variable is not variable');
    }

    const value: any = variable.get();

    if (typeof value === 'function') {
        return {
            value: '[Marked Function]',
            mutable: variable.mutable,
        };
    }

    return {
        value,
        mutable: variable.mutable,
    };
};
