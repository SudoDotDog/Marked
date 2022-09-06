/**
 * @author WMXPY
 * @namespace Parse
 * @description Emit TypeScript Source
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { emitTypeScriptSource } from '../../../src';

describe('Given Integration Parse (Emit TypeScript Source) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-emit-typescript-source');

    it('should be able to emit typescript source', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join('\n');

        const javaScriptCode: string = await emitTypeScriptSource(typeScriptCode);

        expect(javaScriptCode).to.be.equal([
            `export const a = 'hello';`,
            '',
        ].join('\n'));
    });
});
