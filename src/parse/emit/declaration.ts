/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source And Declaration
 */

import * as TS from "typescript";
import { createTypeScriptComplierHost } from "../../host/complier";
import { Host_Target_File } from "../../host/declare";

export const emitTypeScriptDeclaration = async (
    sourceCode: string,
): Promise<string> => {

    let result: string = '';

    const host: TS.CompilerHost = createTypeScriptComplierHost(
        sourceCode,
        undefined,
        (declarationCode: string) => {
            result = declarationCode;
        },
    );
    const program: TS.Program = TS.createProgram({
        rootNames: [Host_Target_File],
        options: {
            declaration: true,
            emitDeclarationOnly: true,
            strict: false,
            alwaysStrict: false,
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            target: TS.ScriptTarget.ESNext,
        },
        host,
    });
    program.emit();

    return result;
};
