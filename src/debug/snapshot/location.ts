/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Location
 */

import * as EST from "estree";
import { MarkedDebugSnapshotPosition } from "./position";

export class MarkedDebugSnapshotLocation {

    public static fromNode(node: EST.Node): MarkedDebugSnapshotLocation {

        const location: EST.SourceLocation = node.loc as EST.SourceLocation;

        const startPosition: MarkedDebugSnapshotPosition =
            MarkedDebugSnapshotPosition.fromPosition(location.start);

        const endPosition: MarkedDebugSnapshotPosition =
            MarkedDebugSnapshotPosition.fromPosition(location.end);

        const range: [number, number] = node.range as [number, number];

        return new MarkedDebugSnapshotLocation(
            startPosition,
            endPosition,
            range[0],
            range[1],
        );
    }

    private readonly _startPosition: MarkedDebugSnapshotPosition;
    private readonly _endPosition: MarkedDebugSnapshotPosition;
    private readonly _startRange: number;
    private readonly _endRange: number;

    private constructor(
        startPosition: MarkedDebugSnapshotPosition,
        endPosition: MarkedDebugSnapshotPosition,
        startRange: number,
        endRange: number,
    ) {

        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._startRange = startRange;
        this._endRange = endRange;
    }

    public get startPosition(): MarkedDebugSnapshotPosition {
        return this._startPosition;
    }
    public get endPosition(): MarkedDebugSnapshotPosition {
        return this._endPosition;
    }
    public get startRange(): number {
        return this._startRange;
    }
    public get endRange(): number {
        return this._endRange;
    }

    public sliceCodeClip(sourceCode: string): string {

        return sourceCode.substring(this._startRange, this._endRange);
    }
}
