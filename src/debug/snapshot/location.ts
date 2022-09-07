/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Location
 */

import * as EST from "estree";
import { New_Line_Character } from "../../host/declare";
import { BaseSourceMapLocationFinder } from "../../source-map/location-finder/base";
import { Trace } from "../../variable/trace/trace";
import { MarkedDebugSnapshotPosition } from "./position";

export class MarkedDebugSnapshotLocation {

    public static fromNode(node: EST.Node, trace: Trace): MarkedDebugSnapshotLocation {

        const location: EST.SourceLocation = node.loc as EST.SourceLocation;
        const locationFinder: BaseSourceMapLocationFinder = trace.ensureLocationFinder();

        const startPosition: MarkedDebugSnapshotPosition =
            MarkedDebugSnapshotPosition.fromPosition(
                locationFinder.findSourceLocation(location.start),
            );

        const endPosition: MarkedDebugSnapshotPosition =
            MarkedDebugSnapshotPosition.fromPosition(
                locationFinder.findSourceLocation(location.end),
            );

        return new MarkedDebugSnapshotLocation(
            startPosition,
            endPosition,
        );
    }

    private readonly _startPosition: MarkedDebugSnapshotPosition;
    private readonly _endPosition: MarkedDebugSnapshotPosition;

    private constructor(
        startPosition: MarkedDebugSnapshotPosition,
        endPosition: MarkedDebugSnapshotPosition,
    ) {

        this._startPosition = startPosition;
        this._endPosition = endPosition;
    }

    public get startPosition(): MarkedDebugSnapshotPosition {
        return this._startPosition;
    }
    public get endPosition(): MarkedDebugSnapshotPosition {
        return this._endPosition;
    }

    public sliceCodeClip(sourceCode: string): string {

        const splitSourceCode: string[] = sourceCode.split(New_Line_Character);

        const startLine: number = this._startPosition.line;
        const endLine: number = this._endPosition.line;

        const startColumn: number = this._startPosition.column;
        const endColumn: number = this._endPosition.column;

        if (startLine === endLine) {
            return splitSourceCode[startLine - 1].slice(startColumn, endColumn);
        }

        const result: string[] = [];

        result.push(splitSourceCode[startLine - 1].slice(startColumn));
        for (let i = startLine; i < endLine - 1; i++) {
            result.push(splitSourceCode[i]);
        }
        result.push(splitSourceCode[endLine - 1].slice(0, endColumn));

        return result.join(New_Line_Character);
    }
}
