/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Inject
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Inject) Cases', (): void => {

    const chance = new Chance('integration-cross-file-inject');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to use same injection when execute cross file', async (): Promise<void> => {

        const aValue: number = chance.integer({ min: 0, max: 100 });

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('a', aValue);

        sandbox.resolver(() => {
            return {
                script: [
                    `const b = a + 1;`,
                    `export default b;`,
                ].join(New_Line_Character),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import b from 'test';export default b;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(aValue + 1);
    });
});
