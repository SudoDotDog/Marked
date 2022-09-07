/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Declaration
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { emitTypeScriptDeclaration } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given Integration Parse Emit (Declaration) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-declaration');

    it('should be able to emit typescript declaration', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join(New_Line_Character);

        const javaScriptCode: string = await emitTypeScriptDeclaration(typeScriptCode);

        expect(javaScriptCode).to.be.equal([
            `export declare const a: string;`,
            '',
        ].join(New_Line_Character));
    });
});
