/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Update Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <UpdateExpression> Cases', (): void => {

    const chance = new Chance('sandbox-update-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle position operation - number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 0, max: 100 });
        sandbox.inject('value', value);

        const result = await sandbox.evaluate(`export default value++;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });

    it('should be able to handle position operation - prefix number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 0, max: 100 });
        sandbox.inject('value', value);

        const result = await sandbox.evaluate(`export default ++value;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value + 1);
    });

    it('should be able to handle position operation - string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.inject('value', chance.string());

        const result = await sandbox.evaluate(`export default value++;`);

        assertFailedMarkedResult(result);
    });
});
