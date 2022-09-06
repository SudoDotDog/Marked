/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Instance Of
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Instance Of) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-cross-file-instance-of');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute cross file instance of operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.resolver(() => {
            return {
                script: [
                    `class A{}`,
                    `export default A;`,
                ].join('\n'),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import A from 'test';const a = new A();export default a instanceof A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });
});
