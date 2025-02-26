/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Transform
 * @override Integration Test
 */

import Chance from "chance";
import { emitTypeScriptTransform, EmitTypeScriptTransformResult } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given Integration Parse Emit (Transform) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-transform');

    it('should be able to emit typescript source and declaration', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join(New_Line_Character);

        const javaScriptCode: EmitTypeScriptTransformResult = await emitTypeScriptTransform(typeScriptCode);

        expect(javaScriptCode.source).toEqual([
            `export const a = 'hello';`,
        ].join(New_Line_Character));

        expect(javaScriptCode.sourceMap).toEqual({
            sourceRoot: '',
            // spell-checker: disable-next-line
            mappings: 'AAAA,MAAM,CAAC,MAAM,CAAC,GAAW,OAAO,CAAC',
        });

        expect(javaScriptCode.declaration).toEqual([
            `export declare const a: string;`,
        ].join(New_Line_Character));
    });

    it('should be able to emit typescript source and declaration with start comments and multi lines', async (): Promise<void> => {

        const typeScriptCode: string = [
            `// Start`,
            `export const a: string = 'hello';`,
            `export const b: string = 'world';`,
        ].join(New_Line_Character);

        const javaScriptCode: EmitTypeScriptTransformResult = await emitTypeScriptTransform(typeScriptCode);

        expect(javaScriptCode.source).toEqual([
            `// Start`,
            `export const a = 'hello';`,
            `export const b = 'world';`,
        ].join(New_Line_Character));

        expect(javaScriptCode.sourceMap).toEqual({
            sourceRoot: '',
            // spell-checker: disable-next-line
            mappings: 'AAAA,QAAQ;AACR,MAAM,CAAC,MAAM,CAAC,GAAW,OAAO,CAAC;AACjC,MAAM,CAAC,MAAM,CAAC,GAAW,OAAO,CAAC',
        });

        expect(javaScriptCode.declaration).toEqual([
            `export declare const a: string;`,
            `export declare const b: string;`,
        ].join(New_Line_Character));
    });
});
