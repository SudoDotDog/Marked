/**
 * @author WMXPY
 * @namespace Analysis
 * @description Analyzer
 */

import * as EST from "estree";
import { SandboxLanguage } from "../declare/sandbox";
import { EST_TYPE, IESTreeType } from "../declare/types";
import { ParseScriptResult } from "../marked/declare";
import { parseScript } from "../parse/script/parse-script";
import { findAllESTNodes } from "./find-all";
import { findOneESTNodeOrNull } from "./find-one";

export class MarkedAnalyzer {

    public static async fromSourceAsync(
        sourceCode: string,
        language: SandboxLanguage,
    ): Promise<MarkedAnalyzer> {

        const parsedResult: ParseScriptResult = await parseScript(sourceCode, language);

        return new MarkedAnalyzer(parsedResult);
    }

    private readonly _parsed: ParseScriptResult;

    private constructor(
        parsedResult: ParseScriptResult,
    ) {

        this._parsed = parsedResult;
    }

    public findOneNodeOrNull<T extends EST_TYPE>(
        type: T,
    ): IESTreeType[T] | null {

        const result = findOneESTNodeOrNull(this._parsed.estree, type);

        if (result === null || typeof result === 'undefined') {
            return null;
        }

        return {
            ...result,
            loc: this._findUpdatedLocation(result),
        };
    }

    public findAllNodes<T extends EST_TYPE>(
        type: T,
    ): Array<IESTreeType[T]> {

        const result: Array<IESTreeType[T]> = findAllESTNodes(this._parsed.estree, type);

        return result.map((each: IESTreeType[T]) => ({
            ...each,
            loc: this._findUpdatedLocation(each),
        }));
    }

    private _findUpdatedLocation(
        node: EST.Node,
    ): EST.SourceLocation {

        const originalLocation: EST.SourceLocation = node.loc as EST.SourceLocation;

        const startPosition: EST.Position = this._parsed.locationFinder.findSourceLocation(originalLocation.start, node);

        const endPosition: EST.Position = this._parsed.locationFinder.findSourceLocation(originalLocation.end, node);

        return {
            start: startPosition,
            end: endPosition,
        };
    }
}
