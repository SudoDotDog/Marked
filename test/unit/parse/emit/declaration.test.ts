/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Declaration
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { emitTypeScriptDeclaration } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given (Emit Declaration) Parse Methods', (): void => {

    const chance: Chance.Chance = new Chance('parse-emit-declaration');

    it('should be able to emit declaration', async (): Promise<void> => {

        const value: string = chance.word();

        const code: string = [
            `export const a:string = "${value}";`,
        ].join(New_Line_Character);

        const result: string = await emitTypeScriptDeclaration(code);

        expect(result).to.be.equal([
            `export declare const a: string;`,
        ].join('\n'));
    });
});
