/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Declare
 */

export type MarkedDebugSnapshotScopeMap =
    Map<string, MarkedDebugSnapshotScopeVariable>;

export type MarkedDebugSnapshotScopeVariable = {

    readonly type:
    | 'function'
    | 'number'
    | 'string'
    | 'boolean'
    | 'undefined'
    | 'null'
    | 'list'
    | 'map'
    | 'class'
    | 'class-instance'
    | 'unknown';
    readonly value: any;
    readonly native: boolean;
    readonly mutable: boolean;
};
