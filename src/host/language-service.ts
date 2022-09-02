/**
 * @author WMXPY
 * @namespace Host
 * @description Language Service
 */

import * as TS from "typescript";
import { Host_Target_File } from "./declare";

export const createTypeScriptLanguageServiceHost = (sourceCode: string): TS.LanguageServiceHost => {

    return {
        readFile: (_fileName: string): string => {
            return sourceCode;
        },
        fileExists: (_fileName: string): boolean => false,
        getCompilationSettings: () => TS.getDefaultCompilerOptions(),
        getScriptFileNames: () => [],
        getScriptVersion: (_fileName: string) => "0",
        getScriptSnapshot: (fileName: string) => {
            if (fileName !== Host_Target_File) {
                return undefined;
            }
            return TS.ScriptSnapshot.fromString(
                sourceCode,
            );
        },
        getCurrentDirectory: () => "/",
        getDefaultLibFileName: (options: TS.CompilerOptions) => TS.getDefaultLibFilePath(options),
    } as any;
};
