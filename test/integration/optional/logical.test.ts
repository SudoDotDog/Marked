/**
 * @author WMXPY
 * @namespace Optional
 * @description Logical
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Optional (Logical) Cases', (): void => {

    const chance = new Chance('integration-optional-logical');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get result without optional chain', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const map={a:"${value}"};export default map.a || "wave";`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });
});
