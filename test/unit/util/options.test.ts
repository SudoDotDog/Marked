/**
 * @author WMXPY
 * @namespace Util
 * @description Options Test
 */

import { ISandboxOptions } from "../../../src/declare/sandbox";
import { New_Line_Character } from "../../../src/host/declare";
import { getCommentRemovedCode, getDefaultSandboxOption, getRawCode, getRawCodeLength } from "../../../src/util/options";

describe("Given an Options utils", (): void => {

    describe("test get default sandbox option", (): void => {

        it("should return a valid ISandboxOptions object", (): void => {

            const result: ISandboxOptions = getDefaultSandboxOption();
            const expectedKeys = [
                "duration",
                "maxCodeLength",
                "maxExpression",
                "maxForLoopLimit",
                "maxWhileLoopLimit",
            ];

            expectedKeys.forEach(key => {
                expect(Object.keys(result)).toContain(key);
            });
        });
    });

    describe("test raw code parsers", (): void => {

        const testCode: string = [

            "import a from 'a'",
            "const b = () => a // test",
            "/*",
            "add something",
            "*/",
            "b()",
        ].join(New_Line_Character);

        it("should remove comments", (): void => {

            const result: string = getCommentRemovedCode(testCode);
            expect(result.split(New_Line_Character)).toHaveLength(4);
        });

        it("should merge code to one line", (): void => {

            const result: string = getRawCode(testCode);
            expect(result.split(New_Line_Character)).toHaveLength(1);

            expect(result).toHaveLength(37);
        });

        it("should shrink length", (): void => {

            const result: number = getRawCodeLength(testCode);

            expect(result).toEqual(37);
        });
    });
});
