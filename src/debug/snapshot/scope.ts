/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Scope
 */

import { Scope } from "../../variable/scope";
import { MarkedDebugSnapshotScopeMap } from "./declare";

export class MarkedDebugSnapshotScope {

    public static fromScope(scope: Scope): MarkedDebugSnapshotScope {

        const map: MarkedDebugSnapshotScopeMap = new Map();

        const keys: Iterable<string> = scope.constantMap.keys();
        for (const key of keys) {

            const variable: any = scope.constantMap.get(key);
            map.set(key, {
                value: variable,
                mutable: variable.mutable,
            });
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
}
