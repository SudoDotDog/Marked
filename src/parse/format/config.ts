/**
 * @author WMXPY
 * @namespace Parse_Format
 * @description Config
 */

import * as TS from "typescript";
import { New_Line_Character } from "../../host/declare";

export const createDefaultFormatTypeScriptCodeSettings =
    (): TS.FormatCodeSettings => {

        return {

            baseIndentSize: 0,
            convertTabsToSpaces: true,
            indentSize: 4,
            indentStyle: TS.IndentStyle.Smart,
            insertSpaceAfterCommaDelimiter: true,
            insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceBeforeAndAfterBinaryOperators: true,
            newLineCharacter: New_Line_Character,
            semicolons: TS.SemicolonPreference.Insert,
            tabSize: 4,
            trimTrailingWhitespace: true,
        };
    };
