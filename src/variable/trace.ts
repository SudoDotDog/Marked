/**
 * @author WMXPY
 * @namespace Variable
 * @description Trace
 */

import * as EST from "estree";
import { ScriptLocation } from "../declare/script-location";
import { ITrace } from "../declare/variable";

export class Trace implements ITrace {

    public static init(scriptLocation?: ScriptLocation): Trace {

        return new Trace(null, undefined, scriptLocation);
    }

    private readonly _parent: Trace | null;
    private readonly _node: EST.Node | null;

    private readonly _scriptLocation?: ScriptLocation;

    public constructor(node: EST.Node | null, parent?: Trace, scriptLocation?: ScriptLocation) {

        this._parent = parent || null;
        this._node = node;

        this._scriptLocation = scriptLocation;
    }

    public get scriptLocation(): ScriptLocation | undefined {

        if (this._scriptLocation) {
            return this._scriptLocation;
        }

        if (this._parent) {
            return this._parent.scriptLocation;
        }

        return undefined;
    }

    public getNode(): EST.Node | null {

        return this._node;
    }

    public getParent(): Trace | null {

        return this._parent;
    }

    public stack(node: EST.Node): Trace {

        return new Trace(node, this, this._scriptLocation);
    }
}
