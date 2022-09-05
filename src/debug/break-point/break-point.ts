/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Break Point
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";

export abstract class MarkedDebugBreakPoint {

    private readonly _scriptLocation: ScriptLocation;

    protected constructor(scriptLocation: ScriptLocation) {

        this._scriptLocation = scriptLocation;
    }

    protected _properToHandle(scriptLocation: ScriptLocation): boolean {

        return this._scriptLocation.compare(scriptLocation);
    }

    public abstract shouldTrigger(scriptLocation: ScriptLocation, node: EST.Node): boolean;
    public abstract shouldReset(scriptLocation: ScriptLocation, node: EST.Node): boolean;
}
