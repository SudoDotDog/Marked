/**
 * @author WMXPY
 * @namespace Parse_Format
 * @description TypeScript
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { formatTypeScriptCode } from '../../../../src';

describe('Given Integration Parse Format (TypeScript) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-parse-format-typescript');

    it('should be able to format typescript code', async (): Promise<void> => {

        const typeScriptCode: string = [
            `export const a: string = 'hello';`,
        ].join('\n');

        const formatted: string = await formatTypeScriptCode(typeScriptCode);

        expect(formatted).to.be.equal([
            `export const a: string = 'hello';`,
        ].join('\n'));
    });
});
