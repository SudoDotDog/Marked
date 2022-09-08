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
    | 'bigint'
    | 'string'
    | 'boolean'
    | 'undefined'
    | 'null'
    | 'list'
    | 'map'
    | 'regexp'
    | 'class'
    | 'class-instance'
    | 'unknown';
    readonly value: any;
    readonly native: boolean;
    readonly mutable: boolean;
};
