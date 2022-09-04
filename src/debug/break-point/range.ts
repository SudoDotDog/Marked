/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Range
 */

import { MarkedDebugBreakPoint } from "./break-point";

export class MarkedDebugRangeBreakPoint extends MarkedDebugBreakPoint {

    public static fromRangeStart(rangeStart: number): MarkedDebugRangeBreakPoint {

        return new MarkedDebugRangeBreakPoint(rangeStart);
    }

    private readonly _rangeStart: number;

    private constructor(
        rangeStart: number,
    ) {

        super();

        this._rangeStart = rangeStart;
    }
}
