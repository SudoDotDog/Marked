/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source
 */

import * as TS from "typescript";
import { createTypeScriptComplierHost } from "../../host/complier";
import { Host_Target_File, New_Line_Character } from "../../host/declare";

export const emitTypeScriptSource = async (
    sourceCode: string,
): Promise<string> => {

    let result: string = '';

    const host: TS.CompilerHost = createTypeScriptComplierHost(
        sourceCode,
        (sourceCompiledCode: string) => {

            result = sourceCompiledCode;
            if (result.endsWith(New_Line_Character)) {
                result = result.substring(
                    0,
                    result.length - New_Line_Character.length,
                );
            }
        },
    );

    const program: TS.Program = TS.createProgram({
        rootNames: [Host_Target_File],
        options: {
            declaration: false,
            strict: false,
            alwaysStrict: false,
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            target: TS.ScriptTarget.ESNext,
            newLine: TS.NewLineKind.LineFeed,
        },
        host,
    });

    program.emit();
    return result;
};
