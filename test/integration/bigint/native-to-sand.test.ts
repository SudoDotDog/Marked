/**
 * @author WMXPY
 * @namespace RegExp
 * @description Native To Sand
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration BiInt (Native To Sand) Cases', (): void => {

    const chance = new Chance('integration-bigint-native-to-sand');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to inject bigint value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 0, max: 100 });

        sandbox.inject('bigint', BigInt(value));

        const result: MarkedResult = await sandbox.evaluate(`export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(value));
    });
});
