/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Export
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Export) Cases', (): void => {

    const chance = new Chance('integration-cross-file-export');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to only export from script file', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 0, max: 100 });

        sandbox.resolver(() => {
            return {
                script: [
                    `export const crossFile = ${value};`,
                ].join(New_Line_Character),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import {crossFile} from 'test';export default crossFile;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
        expect(Object.keys(result.exports.named)).to.be.deep.equal({});
    });
});
