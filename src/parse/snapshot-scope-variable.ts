/**
 * @author WMXPY
 * @namespace Parse
 * @description Snapshot Scope Variable
 */

import { MarkedDebugSnapshotScopeVariable } from "../debug/snapshot/declare";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { Variable } from "../variable/variable";

export const parseSnapshotScopeVariable = (variable: Variable<any>): MarkedDebugSnapshotScopeVariable => {

    if (!(variable instanceof Variable)) {
        throw error(ERROR_CODE.INTERNAL_ERROR, 'Scope variable is not variable');
    }

    const value: any = variable.get();

    if (value instanceof SandList) {
        return {
            value: value.list,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandMap) {
        return {
            value: value.map,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandFunction) {
        return {
            value: '[Marked Function]',
            mutable: false,
        };
    }

    if (typeof value === 'function') {
        return {
            value: '[Marked Native Function]',
            mutable: variable.mutable,
        };
    }

    return {
        value,
        mutable: variable.mutable,
    };
};
