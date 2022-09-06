/**
 * @author WMXPY
 * @namespace Optional
 * @description Logical
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Optional (Logical) Cases', (): void => {

    const chance = new Chance('integration-optional-logical');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get result with true chain logical operator', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();
        const fallback: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const map={a:"${value}"};export default map.a || "${fallback}";`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });

    it('should be able to get fallback result with true chain logical operator', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();
        const fallback: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const map={a:"${value}"};export default map.b || "${fallback}";`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(fallback);
    });
});
