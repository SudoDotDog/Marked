/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Snapshot
 */

import { Scope } from "../../variable/scope";
import { MarkedDebugSnapshotScope } from "./scope";

export class MarkedDebugSnapshot {

    public static fromScope(scope: Scope): MarkedDebugSnapshot {

        return new MarkedDebugSnapshot(
            MarkedDebugSnapshotScope.fromScope(scope),
        );
    }

    private readonly _snapShotScope: MarkedDebugSnapshotScope;

    private constructor(scope: MarkedDebugSnapshotScope) {

        this._snapShotScope = scope;
    }
}
