/**
 * @author WMXPY
 * @namespace Callback
 * @description Simple
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Callback (Simple) Cases', (): void => {

    const chance = new Chance('integration-callback-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create sand callback and be executed in native', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('executeCallBack', (callback: () => void) => {
            callback();
        });

        const value: number = chance.integer({ min: 0, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let value = 0;`,
            `executeCallBack(() => {`,
            `value = ${value};`,
            `});`,
            `export default value;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });
});
