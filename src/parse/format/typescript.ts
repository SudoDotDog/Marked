/**
 * @author WMXPY
 * @namespace Parse_Format
 * @description TypeScript
 */

import * as TS from "typescript";
import { Host_Target_File } from "../../host/declare";
import { createTypeScriptLanguageServiceHost } from "../../host/language-service";
import { createDefaultFormatTypeScriptCodeSettings } from "./config";

export const formatTypeScriptCode = async (
    sourceCode: string,
    settings?: TS.FormatCodeSettings,
): Promise<string> => {

    const defaultSettings: TS.FormatCodeSettings = createDefaultFormatTypeScriptCodeSettings();

    const fixedSettings: TS.FormatCodeSettings = {
        ...defaultSettings,
        ...settings,
    };

    const host: TS.LanguageServiceHost = createTypeScriptLanguageServiceHost(sourceCode);

    const languageService = TS.createLanguageService(host);
    const textChanges: TS.TextChange[] = languageService.getFormattingEditsForDocument(
        Host_Target_File,
        fixedSettings,
    );

    let result: string = sourceCode;

    textChanges.sort((first: TS.TextChange, second: TS.TextChange) => {
        if (first.span.start < second.span.start) {
            return 1;
        }
        if (first.span.start > second.span.start) {
            return -1;
        }
        return 0;
    }).forEach((textChange: TS.TextChange) => {

        const head: string = result.slice(0, textChange.span.start);
        const tail: string = result.slice(textChange.span.start + textChange.span.length);

        result = `${head}${textChange.newText}${tail}`;
    });

    return result;
};
