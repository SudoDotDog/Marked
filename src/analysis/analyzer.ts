/**
 * @author WMXPY
 * @namespace Analysis
 * @description Analyzer
 */

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
        return result;
    }

    public findAllNodes<T extends EST_TYPE>(
        type: T,
    ): Array<IESTreeType[T]> {

        const result = findAllESTNodes(this._parsed.estree, type);
        return result;
    }
}
