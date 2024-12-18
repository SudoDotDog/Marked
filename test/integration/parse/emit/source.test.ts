/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source
 * @override Integration Test
 */

import Chance from "chance";
import { emitTypeScriptSource } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given Integration Parse Emit (Source) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-source');

    it('should be able to emit typescript source', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join(New_Line_Character);

        const javaScriptCode: string = await emitTypeScriptSource(typeScriptCode);

        expect(javaScriptCode).toEqual([
            `export const a = 'hello';`,
        ].join(New_Line_Character));
    });
});
