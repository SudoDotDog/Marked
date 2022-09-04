/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Range
 */

import * as EST from "estree";
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

    public shouldTrigger(node: EST.Node): boolean {

        const sourceLocation: [number, number] = node.range as [number, number];
        return this._rangeStart >= sourceLocation[0]
            && this._rangeStart <= sourceLocation[1];

    }

    public shouldReset(node: EST.Node): boolean {

        return !this.shouldTrigger(node);
    }
}
