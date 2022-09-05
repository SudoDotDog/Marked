/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Controller
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { MarkedDebugBreakPoint } from "./break-point";

export class MarkedDebugBreakPointController {

    public static fromBreakPoints(
        breakPoints: Iterable<MarkedDebugBreakPoint>,
    ): MarkedDebugBreakPointController {

        const breakPointsSet: Set<MarkedDebugBreakPoint> = new Set(breakPoints);
        return new MarkedDebugBreakPointController(breakPointsSet);
    }

    private readonly _pendingBreakPoints: Set<MarkedDebugBreakPoint>;
    private readonly _triggeredBreakPoints: Set<MarkedDebugBreakPoint>;

    private constructor(
        breakPoints: Set<MarkedDebugBreakPoint>,
    ) {

        this._pendingBreakPoints = breakPoints;
        this._triggeredBreakPoints = new Set();
    }

    public shouldBreak(scriptLocation: ScriptLocation, node: EST.Node): boolean {

        const pendingClone: Set<MarkedDebugBreakPoint> = new Set(this._pendingBreakPoints);
        const triggeredClone: Set<MarkedDebugBreakPoint> = new Set(this._triggeredBreakPoints);

        for (const breakPoint of triggeredClone) {
            if (breakPoint.shouldReset(scriptLocation, node)) {

                this._pendingBreakPoints.add(breakPoint);
                this._triggeredBreakPoints.delete(breakPoint);
            }
        }

        let triggered: boolean = false;

        for (const breakPoint of pendingClone) {
            if (breakPoint.shouldTrigger(scriptLocation, node)) {

                this._triggeredBreakPoints.add(breakPoint);
                this._pendingBreakPoints.delete(breakPoint);

                triggered = true;
            }
        }

        return triggered;
    }
}
