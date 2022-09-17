/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Snapshot
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { Scope } from "../../variable/scope";
import { Trace } from "../../variable/trace/trace";
import { MarkedDebugSnapshotLocation } from "./location";
import { MarkedDebugSnapshotNode } from "./node";
import { MarkedDebugSnapshotScope } from "./scope";

export class MarkedDebugSnapshot {

    public static fromScopeAndNode(
        sourceCode: string,
        scope: Scope,
        node: EST.Node,
        trace: Trace,
    ): MarkedDebugSnapshot {

        const snapshotScope: MarkedDebugSnapshotScope =
            MarkedDebugSnapshotScope.fromScope(scope);
        const snapshotLocation: MarkedDebugSnapshotLocation =
            MarkedDebugSnapshotLocation.fromNode(node, trace);
        const snapshotNode: MarkedDebugSnapshotNode =
            MarkedDebugSnapshotNode.fromNode(node);

        return new MarkedDebugSnapshot(
            sourceCode,
            trace.scriptLocation,
            snapshotScope,
            snapshotLocation,
            snapshotNode,
        );
    }

    private readonly _sourceCode: string;
    private readonly _scriptLocation: ScriptLocation;

    private readonly _scope: MarkedDebugSnapshotScope;
    private readonly _location: MarkedDebugSnapshotLocation;
    private readonly _node: MarkedDebugSnapshotNode;

    private constructor(
        sourceCode: string,
        scriptLocation: ScriptLocation,
        scope: MarkedDebugSnapshotScope,
        location: MarkedDebugSnapshotLocation,
        node: MarkedDebugSnapshotNode,
    ) {

        this._sourceCode = sourceCode;
        this._scriptLocation = scriptLocation;

        this._scope = scope;
        this._location = location;
        this._node = node;
    }

    public get scope(): MarkedDebugSnapshotScope {
        return this._scope;
    }
    public get location(): MarkedDebugSnapshotLocation {
        return this._location;
    }
    public get node(): MarkedDebugSnapshotNode {
        return this._node;
    }

    public getScriptLocation(): ScriptLocation {

        return this._scriptLocation;
    }

    public sliceCodeClip(): string {

        return this._location.sliceCodeClip(this._sourceCode);
    }
}
