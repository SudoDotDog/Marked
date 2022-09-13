/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Provide
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Provide) Cases', (): void => {

    const chance = new Chance('integration-cross-file-provide');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to use same provides when execute cross file', async (): Promise<void> => {

        const aValue: number = chance.integer({ min: 0, max: 100 });

        const sandbox: Sandbox = createSandbox();
        sandbox.provide('a', {
            value: aValue,
        });

        sandbox.resolver(() => {
            return {
                script: [
                    `import {value as a} from 'a';`,
                    `const b = a + 1;`,
                    `export default b;`,
                ].join(New_Line_Character),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import b from 'test';export default b;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(aValue + 1);
    });
});
