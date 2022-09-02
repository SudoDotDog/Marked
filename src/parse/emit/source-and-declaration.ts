/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source And Declaration
 */

import * as TS from "typescript";
import { createTypeScriptComplierHost } from "../../host/complier";
import { Host_Target_File } from "../../host/declare";

export type EmitTypeScriptSourceAndDeclarationResult = {

    source: string;
    declaration: string;
};

export const emitTypeScriptSourceAndDeclaration = async (
    sourceCode: string,
): Promise<EmitTypeScriptSourceAndDeclarationResult> => {


    const results: EmitTypeScriptSourceAndDeclarationResult = {
        source: '',
        declaration: '',
    };

    const host: TS.CompilerHost = createTypeScriptComplierHost(
        sourceCode,
        (sourceCompiledCode: string) => {
            results.source = sourceCompiledCode;
        },
        (declarationCode: string) => {
            results.declaration = declarationCode;
        },
    );
    const program: TS.Program = TS.createProgram({
        rootNames: [Host_Target_File],
        options: {
            declaration: true,
            strict: false,
            alwaysStrict: false,
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            target: TS.ScriptTarget.ESNext,
        },
        host,
    });
    program.emit();

    return results;
};
