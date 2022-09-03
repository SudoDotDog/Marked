/**
 * @author WMXPY
 * @namespace Variable_Trace
 * @description Trace Class
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { ITrace } from "../../declare/variable";
import { SandClass } from "../sand-class/sand-class";
import { Trace } from "./trace";

export class TraceClass extends Trace implements ITrace {

    public static fromStack(
        parent: Trace,
        node: EST.Node,
        sandClass: SandClass,
    ): TraceClass {

        return new TraceClass(node, parent, parent.scriptLocation, sandClass);
    }

    private readonly _sandClass: SandClass;

    public constructor(node: EST.Node | null, parent: Trace, scriptLocation: ScriptLocation | undefined, sandClass: SandClass) {

        super(node, parent, scriptLocation);

        this._sandClass = sandClass;
    }

    public get sandClass(): SandClass {
        return this._sandClass;
    }

    public stack(node: EST.Node): Trace {

        return new TraceClass(node, this, this._scriptLocation, this._sandClass);
    }
}
