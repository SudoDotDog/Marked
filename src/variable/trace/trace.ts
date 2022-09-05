/**
 * @author WMXPY
 * @namespace Variable_Trace
 * @description Trace
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { ITrace } from "../../declare/variable";

export class Trace implements ITrace {

    public static init(scriptLocation: ScriptLocation): Trace {

        return new Trace(scriptLocation, null, undefined,);
    }

    protected readonly _scriptLocation: ScriptLocation;

    protected readonly _parent: Trace | null;
    protected readonly _node: EST.Node | null;

    protected constructor(
        scriptLocation: ScriptLocation,
        node: EST.Node | null,
        parent?: Trace,
    ) {

        this._scriptLocation = scriptLocation;

        this._parent = parent || null;
        this._node = node;
    }

    public get scriptLocation(): ScriptLocation {
        return this._scriptLocation;
    }

    public getNode(): EST.Node | null {

        return this._node;
    }

    public getParent(): Trace | null {

        return this._parent;
    }

    public stack(node: EST.Node): Trace {

        return new Trace(this._scriptLocation, node, this);
    }
}
