/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source And Declaration
 */

import * as TS from "typescript";
import { createTypeScriptComplierHost } from "../../host/complier";
import { Host_Target_File, New_Line_Character } from "../../host/declare";

export const emitTypeScriptDeclaration = async (
    sourceCode: string,
): Promise<string> => {

    let result: string = "";

    const host: TS.CompilerHost = createTypeScriptComplierHost(
        sourceCode,
        undefined,
        undefined,
        (declarationCode: string) => {

            result = declarationCode;
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
            allowUnusedLabels: true,
            allowUnreachableCode: true,
            alwaysStrict: false,
            declaration: true,
            emitDeclarationOnly: true,
            strict: false,
            removeComments: false,
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            target: TS.ScriptTarget.ESNext,
            newLine: TS.NewLineKind.LineFeed,
            importsNotUsedAsValues: TS.ImportsNotUsedAsValues.Preserve,
        },
        host,
    });
    program.emit();

    return result;
};
