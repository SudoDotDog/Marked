/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Snapshot
 */

import * as EST from "estree";
import { Scope } from "../../variable/scope";
import { Trace } from "../../variable/trace/trace";
import { MarkedDebugSnapshotLocation } from "./location";
import { MarkedDebugSnapshotScope } from "./scope";

export class MarkedDebugSnapshot {

    public static fromScopeAndNode(scope: Scope, node: EST.Node, trace: Trace): MarkedDebugSnapshot {

        const snapshotScope: MarkedDebugSnapshotScope = MarkedDebugSnapshotScope.fromScope(scope);
        const location: MarkedDebugSnapshotLocation = MarkedDebugSnapshotLocation.fromNode(node, trace);

        return new MarkedDebugSnapshot(snapshotScope, location);
    }

    private readonly _scope: MarkedDebugSnapshotScope;
    private readonly _location: MarkedDebugSnapshotLocation;

    private constructor(
        scope: MarkedDebugSnapshotScope,
        location: MarkedDebugSnapshotLocation,
    ) {

        this._scope = scope;
        this._location = location;
    }

    public get scope(): MarkedDebugSnapshotScope {
        return this._scope;
    }
    public get location(): MarkedDebugSnapshotLocation {
        return this._location;
    }

    public sliceCodeClip(sourceCode: string): string {

        return this._location.sliceCodeClip(sourceCode);
    }
}
