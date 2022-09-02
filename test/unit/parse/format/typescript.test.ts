/**
 * @author WMXPY
 * @namespace Parse_Format
 * @description TypeScript
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { New_Line_Character } from '../../../../src/host/declare';
import { formatTypeScriptCode } from '../../../../src/parse/format/typescript';

describe('Given (Format TypeScript) Parse Methods', (): void => {

    const chance: Chance.Chance = new Chance('parse-format-typescript');

    it('should be able to format base ts code', async (): Promise<void> => {

        const code: string = [
            `import * as Hello from "world";`,
            `Hello.call("${chance.string()}");`,
        ].join(New_Line_Character);

        const result: string = await formatTypeScriptCode(code);

        expect(result).to.be.equal(code);
    });

    it('should be able to format slashed import ts code', async (): Promise<void> => {

        const code: string = [
            `import * as Hello from "hello/world";`,
            `Hello.call("${chance.string()}");`,
        ].join(New_Line_Character);

        const result: string = await formatTypeScriptCode(code);

        expect(result).to.be.equal(code);
    });

    it('should be able to format incorrect ts code', async (): Promise<void> => {

        const value: string = chance.string();

        const code: string = [
            `import * as Hello from "hello/world";`,
            `Hello.call( "${value}" );`,
        ].join(New_Line_Character);

        const fixedCode: string = [
            `import * as Hello from "hello/world";`,
            `Hello.call("${value}");`,
        ].join(New_Line_Character);

        const result: string = await formatTypeScriptCode(code);

        expect(result).to.be.equal(fixedCode);
    });
});
