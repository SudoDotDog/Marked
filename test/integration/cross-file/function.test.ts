/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Function
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Function) Cases', (): void => {

    const chance = new Chance('integration-cross-file-function');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute cross file function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const aValue: number = chance.integer({ min: 0, max: 100 });

        sandbox.resolver(() => {
            return {
                script: `export const func = () => ${aValue};`,
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import {func} from 'test';export default func();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(aValue);
    });
});
