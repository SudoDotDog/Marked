/**
 * @author WMXPY
 * @namespace Analysis
 * @description Analyzer
 */

import { Node } from "acorn";
import { full } from "acorn-walk";
import { SandboxLanguage } from "../declare/sandbox";
import { EST_TYPE, IESTreeType } from "../declare/types";
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

    public findOneNodeOrNull<T extends EST_TYPE>(
        type: T,
    ): IESTreeType[T] | null {

        let result: IESTreeType[T] | null = null;

        try {

            full(
                this._parsed.estree as any,
                (node: Node, _state: any, nodeType: string) => {
                    if (nodeType === type) {
                        result = node as any;
                        throw new Error('Found');
                    }
                },
            );

            return null;
        } catch (err) {

            if ((err as any).message === 'Found') {
                return result;
            }
            throw err;
        }
    }
}
