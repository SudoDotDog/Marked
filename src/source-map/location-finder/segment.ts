/**
 * @author WMXPY
 * @namespace SourceMap_LocationFinder
 * @description Segment
 */

import { SourceMappingLine, TransformSourceMap } from "../declare";
import { decodeSourceMap } from "../decode";
import * as EST from "estree";
import { error } from "../../util/error/error";
import { ERROR_CODE } from "../../declare/error-code";
import { BaseSourceMapLocationFinder } from "./base";

export class SegmentSourceMapLocationFinder extends BaseSourceMapLocationFinder {

    public static fromSourceMap(sourceMap: TransformSourceMap): SegmentSourceMapLocationFinder {

        const decoded: SourceMappingLine[] = decodeSourceMap(sourceMap.mappings);

        return new SegmentSourceMapLocationFinder(decoded);
    }

    private readonly _decoded: SourceMappingLine[];

    private constructor(
        decoded: SourceMappingLine[],
    ) {

        super();

        this._decoded = decoded;
    }

    public findSourceLocation(position: EST.Position): EST.Position {

        const line: SourceMappingLine | undefined = this._decoded[position.line - 1];

        if (typeof line === 'undefined') {

            throw error(
                ERROR_CODE.CANNOT_FIND_ORIGINAL_POSITION_FROM_LINE,
                `${position.line}:${position.column}`,
            );
        }

        for (const segment of line) {

            if (segment.targetColumn === position.column) {
                return {
                    line: segment.sourceLine + 1,
                    column: segment.sourceColumn,
                };
            }
        }

        throw error(
            ERROR_CODE.CANNOT_FIND_ORIGINAL_POSITION_FROM_COLUMN,
            `${position.line}:${position.column}`,
        );
    }
}
