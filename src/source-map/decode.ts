/**
 * @author WMXPY
 * @namespace SourceMap
 * @description Decode
 */

import { SourceMapMappings, decode } from "sourcemap-codec";
import { SourceMappingLine, SourceMappingSegment } from "./declare";

export const decodeSourceMap = (sourceMapString: string): SourceMappingLine[] => {

    const decoded: SourceMapMappings = decode(sourceMapString);

    const result: SourceMappingLine[] = [];

    for (const line of decoded) {

        const parsedLine: SourceMappingSegment[] = [];
        for (const segment of line) {

            const parsedSegment: SourceMappingSegment = {
                targetColumn: segment[0],
                sourceLine: segment[2] as number,
                sourceColumn: segment[3] as number,
            };
            parsedLine.push(parsedSegment);
        }

        result.push(parsedLine);
    }
    return result;
};
