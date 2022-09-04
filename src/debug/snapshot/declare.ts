/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Declare
 */

export type MarkedDebugSnapshotScopeMap =
    Map<string, MarkedDebugSnapshotScopeVariable>;

export type MarkedDebugSnapshotScopeVariable = {

    readonly value: any;
    readonly mutable: boolean;
};
