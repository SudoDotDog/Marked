/**
 * @author WMXPY
 * @namespace Host
 * @description Complier
 */

import * as TS from "typescript";
import { Host_Target_File, New_Line_Character } from "./declare";

export type CreateTypeScriptHostWriteSource = (sourceCode: string) => void;
export type CreateTypeScriptHostWriteSourceMap = (sourceMap: string) => void;
export type CreateTypeScriptHostWriteDeclaration = (declarationCode: string) => void;

export const createTypeScriptComplierHost = (
    sourceCode: string,
    emitSource?: CreateTypeScriptHostWriteSource,
    emitSourceMap?: CreateTypeScriptHostWriteSourceMap,
    emitDeclaration?: CreateTypeScriptHostWriteDeclaration,
): TS.CompilerHost => {

    const host: TS.CompilerHost = {

        getSourceFile: (fileName: string): TS.SourceFile | undefined => {

            if (fileName !== `${Host_Target_File}.ts`) {
                return undefined;
            }
            return TS.createSourceFile(
                fileName,
                sourceCode,
                TS.ScriptTarget.ESNext,
            );
        },
        writeFile: (fileName: string, data: string): void => {

            if (fileName === `${Host_Target_File}.js.map`) {
                if (typeof emitSourceMap !== "undefined") {
                    emitSourceMap(data);
                }
            } else if (fileName === `${Host_Target_File}.js`) {
                if (typeof emitSource !== "undefined") {
                    emitSource(data);
                }
            } else if (fileName === `${Host_Target_File}.d.ts`) {
                if (typeof emitDeclaration !== "undefined") {
                    emitDeclaration(data);
                }
            }
        },
        readFile: (_fileName: string): string => {
            return sourceCode;
        },
        fileExists: (_fileName: string): boolean => true,
        getDefaultLibFileName: (defaultLibOptions: TS.CompilerOptions): string => {
            return "/" + TS.getDefaultLibFileName(defaultLibOptions);
        },
        getNewLine: (): string => New_Line_Character,
        getCurrentDirectory: (): string => "/",
        getCanonicalFileName: (fileName: string): string => fileName,
        useCaseSensitiveFileNames: (): boolean => true,
    };

    return host;
};
