/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Line
 */

import * as EST from "estree";
import { ScriptLocation } from "../../declare/script-location";
import { MarkedDebugBreakPoint } from "./break-point";

export class MarkedDebugLineBreakPoint extends MarkedDebugBreakPoint {

    public static fromLineNumber(
        lineNumber: number,
        scriptLocation: ScriptLocation = ScriptLocation.createRoot(),
    ): MarkedDebugLineBreakPoint {

        return new MarkedDebugLineBreakPoint(scriptLocation, lineNumber);
    }

    private readonly _lineNumber: number;

    private constructor(
        scriptLocation: ScriptLocation,
        lineNumber: number,
    ) {

        super(scriptLocation);

        this._lineNumber = lineNumber;
    }

    public shouldTrigger(scriptLocation: ScriptLocation, node: EST.Node): boolean {

        if (!this._properToHandle(scriptLocation)) {
            return false;
        }

        const sourceLocation: EST.SourceLocation = node.loc as EST.SourceLocation;
        return this._lineNumber === sourceLocation.start.line;
    }

    public shouldReset(scriptLocation: ScriptLocation, node: EST.Node): boolean {

        if (!this._properToHandle(scriptLocation)) {
            return false;
        }

        return !this.shouldTrigger(scriptLocation, node);
    }
}
