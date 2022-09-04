/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Line
 */

import { MarkedDebugBreakPoint } from "./break-point";

export class MarkedDebugLineBreakPoint extends MarkedDebugBreakPoint {

    public static fromLineNumber(lineNumber: number): MarkedDebugLineBreakPoint {

        return new MarkedDebugLineBreakPoint(lineNumber);
    }

    private readonly _lineNumber: number;

    private constructor(
        lineNumber: number,
    ) {

        super();

        this._lineNumber = lineNumber;
    }
}
