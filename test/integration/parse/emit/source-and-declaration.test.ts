/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source And Declaration
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { emitTypeScriptSourceAndDeclaration, EmitTypeScriptSourceAndDeclarationResult } from '../../../../src';

describe('Given Integration Parse Emit (Source And Declaration) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-source-and-declaration');

    it('should be able to emit typescript source and declaration', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join('\n');

        const javaScriptCode: EmitTypeScriptSourceAndDeclarationResult = await emitTypeScriptSourceAndDeclaration(typeScriptCode);

        expect(javaScriptCode.source).to.be.equal([
            `export const a = 'hello';`,
            '',
        ].join('\n'));

        expect(javaScriptCode.declaration).to.be.equal([
            `export declare const a: string;`,
            '',
        ].join('\n'));
    });
});
