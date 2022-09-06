/**
 * @author WMXPY
 * @namespace Parse
 * @description Emit TypeScript Source Declaration
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { emitTypeScriptSourceAndDeclaration, EmitTypeScriptSourceAndDeclarationResult } from '../../../src';

describe('Given Integration Parse (Emit TypeScript Source Declaration) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-typescript-source-declaration');

    it('should be able to emit typescript source', async (): Promise<void> => {

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
