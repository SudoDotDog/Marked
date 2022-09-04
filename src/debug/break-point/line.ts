/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Line
 */

import * as EST from "estree";
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

    public shouldTrigger(node: EST.Node): boolean {

        const sourceLocation: EST.SourceLocation = node.loc as EST.SourceLocation;
        return this._lineNumber === sourceLocation.start.line;
    }

    public shouldReset(node: EST.Node): boolean {

        return !this.shouldTrigger(node);
    }
}
