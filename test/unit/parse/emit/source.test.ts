/**
 * @author WMXPY
 * @namespace Parse_Emit
 * @description Source
 */

import Chance from "chance";
import { emitTypeScriptSource } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given (Emit Source) Parse Methods', (): void => {

    const chance: Chance.Chance = new Chance('parse-emit-source');

    it('should be able to emit source - no type declaration', async (): Promise<void> => {

        const code: string = [
            `import * as Hello from "world";`,
            `Hello.call("${chance.string()}");`,
        ].join(New_Line_Character);

        const result: string = await emitTypeScriptSource(code);

        expect(result).toEqual(code);
    });

    it('should be able to emit source - module with slash', async (): Promise<void> => {

        const code: string = [
            `import * as Hello from "hello/world";`,
            `Hello.call("${chance.string()}");`,
        ].join(New_Line_Character);

        const result: string = await emitTypeScriptSource(code);

        expect(result).toEqual(code);
    });
});
