/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Range
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { MarkedDebugBreakPoint } from "./break-point";

export class MarkedDebugRangeBreakPoint extends MarkedDebugBreakPoint {

    public static fromRangeStart(
        scriptLocation: ScriptLocation,
        rangeStart: number,
    ): MarkedDebugRangeBreakPoint {

        return new MarkedDebugRangeBreakPoint(scriptLocation, rangeStart);
    }

    private readonly _rangeStart: number;

    private constructor(
        scriptLocation: ScriptLocation,
        rangeStart: number,
    ) {

        super(scriptLocation);

        this._rangeStart = rangeStart;
    }

    public shouldTrigger(scriptLocation: ScriptLocation, node: EST.Node): boolean {

        if (!this._properToHandle(scriptLocation)) {
            return false;
        }

        const sourceLocation: [number, number] = node.range as [number, number];
        return this._rangeStart >= sourceLocation[0]
            && this._rangeStart <= sourceLocation[1];
    }

    public shouldReset(scriptLocation: ScriptLocation, node: EST.Node): boolean {

        if (!this._properToHandle(scriptLocation)) {
            return false;
        }

        return !this.shouldTrigger(scriptLocation, node);
    }
}
