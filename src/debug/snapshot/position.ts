/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Position
 */

import * as EST from "estree";

export class MarkedDebugSnapshotPosition {

    public static fromPosition(position: EST.Position): MarkedDebugSnapshotPosition {

        return new MarkedDebugSnapshotPosition(position.line, position.column);
    }

    private readonly _line: number;
    private readonly _column: number;

    private constructor(line: number, column: number) {

        this._line = line;
        this._column = column;
    }
}
