/**
 * @author WMXPY
 * @namespace Parse
 * @description Transpile TypeScript
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { New_Line_Character } from '../../../src/host/declare';
import { transpileTypeScriptCode } from '../../../src/parse/transpile-typescript';

describe('Given Transpile TypeScript utils', (): void => {

    const chance: Chance.Chance = new Chance('parse-transpile-typescript');

    it('should be able to compile import - no type declaration', async (): Promise<void> => {

        const code: string = [
            `import * as Hello from "world";`,
            `Hello.call("${chance.string()}");`,
        ].join(New_Line_Character);

        const result: string = await transpileTypeScriptCode(code);

        expect(result).to.be.equal(code + New_Line_Character);
    });
});
