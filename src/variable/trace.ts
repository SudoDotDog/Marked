/**
 * @author WMXPY
 * @namespace Variable
 * @description Trace
 */

import * as EST from "estree";
import { ITrace } from "marked#declare/variable";

export class Trace implements ITrace {

    public static init(): Trace {

        return new Trace(null);
    }

    private readonly _parent: Trace | null;
    private readonly _node: EST.Node | null;

    public constructor(node: EST.Node | null, parent?: Trace) {

        this._parent = parent || null;
        this._node = node;
    }

    public stack(node: EST.Node): Trace {

        return new Trace(node, this);
    }
}
