/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Scope
 */

import { parseSnapshotScopeVariable } from "../../parse/snapshot-scope-variable";
import { Scope } from "../../variable/scope";
import { Variable } from "../../variable/variable";
import { MarkedDebugSnapshotScopeMap, MarkedDebugSnapshotScopeVariable } from "./declare";

export class MarkedDebugSnapshotScope {

    public static fromScope(scope: Scope): MarkedDebugSnapshotScope {

        const map: MarkedDebugSnapshotScopeMap = new Map();

        const keys: Iterable<string> = scope.constantMap.keys();
        for (const key of keys) {

            const variable: Variable<any> = scope.constantMap.get(key) as Variable<any>;
            const value: MarkedDebugSnapshotScopeVariable = parseSnapshotScopeVariable(variable);

            map.set(key, value);
        }

        if (scope.hasParent()) {
            return new MarkedDebugSnapshotScope(
                MarkedDebugSnapshotScope.fromScope(
                    scope.ensureParent()
                ),
                map,
            );
        }
        return new MarkedDebugSnapshotScope(null, map);
    }

    private readonly _parent: MarkedDebugSnapshotScope | null;
    private readonly _map: MarkedDebugSnapshotScopeMap = new Map();

    private constructor(
        parent: MarkedDebugSnapshotScope | null,
        map: MarkedDebugSnapshotScopeMap,
    ) {

        this._parent = parent;
        this._map = map;
    }

    public get map(): MarkedDebugSnapshotScopeMap {
        return this._map;
    }

    public getObject(): Record<string, MarkedDebugSnapshotScopeVariable> {

        const object: Record<string, MarkedDebugSnapshotScopeVariable> = {};
        const keys: Iterable<string> = this._map.keys();
        for (const key of keys) {
            object[key] = this._map.get(key) as MarkedDebugSnapshotScopeVariable;
        }
        return object;
    }

    public hasParent(): boolean {

        return this._parent !== null;
    }
}
