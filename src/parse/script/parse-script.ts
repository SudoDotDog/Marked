/**
 * @author WMXPY
 * @namespace Parse_Script
 * @description Parse Script
 */

import { ERROR_CODE } from "../../declare/error-code";
import { SandboxLanguage } from "../../declare/sandbox";
import { ParseScriptResult } from "../../marked/declare";
import { BaseSourceMapLocationFinder } from "../../source-map/location-finder/base";
import { RawSourceMapLocationFinder } from "../../source-map/location-finder/raw";
import { SegmentSourceMapLocationFinder } from "../../source-map/location-finder/segment";
import { error } from "../../util/error/error";
import { emitTypeScriptTransform, EmitTypeScriptTransformResult } from "../emit/transform";
import { parseCodeToESTree, ParseESTreeResult } from "../parse-estree";

export const parseScript = async (script: string, language: SandboxLanguage): Promise<ParseScriptResult> => {

    if (language === 'javascript') {
        return await parseJavaScript(script);
    } else if (language === 'typescript') {
        return await parseTypeScript(script);
    }

    throw error(ERROR_CODE.UNKNOWN_LANGUAGE);
};

const parseJavaScript = async (script: string): Promise<ParseScriptResult> => {

    try {

        const estree: ParseESTreeResult = await Promise.resolve(
            parseCodeToESTree(script),
        );

        return {
            estree: estree.estree,
            comments: estree.comments,
            locationFinder: RawSourceMapLocationFinder.fromEmpty(),
        };
    } catch (err) {

        const syntaxError: any = err;
        throw error(ERROR_CODE.PARSE_ERROR, syntaxError.message, `POS:${syntaxError.pos}, RAISEDAT:${syntaxError.raisedAt}` as any);
    }
};

const parseTypeScript = async (script: string): Promise<ParseScriptResult> => {

    try {

        const transformResult: EmitTypeScriptTransformResult =
            await emitTypeScriptTransform(script);

        const estree: ParseESTreeResult = await Promise.resolve(
            parseCodeToESTree(transformResult.source)
        );

        const locationFinder: BaseSourceMapLocationFinder =
            SegmentSourceMapLocationFinder.fromSourceMap(transformResult.sourceMap);

        return {
            estree: estree.estree,
            comments: estree.comments,
            locationFinder,
        };
    } catch (err) {

        throw error(ERROR_CODE.TYPESCRIPT_COMPILE_ERROR);
    }
};
