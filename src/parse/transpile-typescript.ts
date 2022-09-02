/**
 * @author WMXPY
 * @namespace Parse
 * @description Transpile TypeScript
 */

import * as TS from "typescript";

export const transpileTypeScriptCode = async (sourceCode: string): Promise<string> => {

    const result: TS.TranspileOutput = TS.transpileModule(
        sourceCode,
        {
            compilerOptions:
            {
                module: TS.ModuleKind.ESNext,
                target: TS.ScriptTarget.ESNext,
                strict: false,
                alwaysStrict: false,
                skipLibCheck: true,
                skipDefaultLibCheck: true,
            },
        },
    );
    return result.outputText;
};
