/**
 * @author WMXPY
 * @namespace SourceMap
 * @description Declare
 */

export type TransformSourceMap = {

    readonly sourceRoot: string;
    readonly mappings: string;
};

export type SourceMappingLine = SourceMappingSegment[];

export type SourceMappingSegment = {

    readonly targetColumn: number;
    readonly sourceLine: number;
    readonly sourceColumn: number;
};
