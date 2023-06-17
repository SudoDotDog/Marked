/**
 * @author WMXPY
 * @namespace Analysis
 * @description Analyzer
 */

import { SandboxLanguage } from "../declare/sandbox";
import { ParseScriptResult } from "../marked/declare";
import { parseScript } from "../parse/script/parse-script";

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
}
