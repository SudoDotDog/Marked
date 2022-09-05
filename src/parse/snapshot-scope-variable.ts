/**
 * @author WMXPY
 * @namespace Parse
 * @description Snapshot Scope Variable
 */

import { MarkedDebugSnapshotScopeVariable } from "../debug/snapshot/declare";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { Variable } from "../variable/variable";

export const parseSnapshotScopeVariable = (variable: Variable<any>): MarkedDebugSnapshotScopeVariable => {

    if (!(variable instanceof Variable)) {
        throw error(ERROR_CODE.INTERNAL_ERROR, 'Scope variable is not variable');
    }

    const value: any = variable.get();

    if (value instanceof SandClass) {
        return {
            type: 'class',
            value: value.body.map,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandClassInstance) {
        return {
            type: 'class-instance',
            value: value.combineBody().map,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandList) {
        return {
            type: 'list',
            value: value.list,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandMap) {
        return {
            type: 'map',
            value: value.map,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (value instanceof SandFunction) {
        return {
            type: 'function',
            value: '[Marked Function]',
            native: false,
            mutable: false,
        };
    }

    if (typeof value === 'function') {
        return {
            type: 'function',
            value: '[Marked Native Function]',
            native: true,
            mutable: variable.mutable,
        };
    }

    if (typeof value === 'number') {
        return {
            type: 'number',
            value,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (typeof value === 'string') {
        return {
            type: 'string',
            value,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (typeof value === 'boolean') {
        return {
            type: 'boolean',
            value,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (typeof value === 'undefined') {
        return {
            type: 'undefined',
            value,
            native: false,
            mutable: variable.mutable,
        };
    }

    if (value === null) {
        return {
            type: 'null',
            value,
            native: false,
            mutable: variable.mutable,
        };
    }

    return {
        type: 'unknown',
        value,
        native: false,
        mutable: variable.mutable,
    };
};
