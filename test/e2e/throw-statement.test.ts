/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Throw Statement
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertExceptionMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <ThrowStatement> Cases', (): void => {

    const chance = new Chance('sandbox-empty-statement');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle root level throw', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`throw "${message}"`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });

    it.only('should be able to handle function level throw', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const t=()=>{throw "${message}";return 10;};export default t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });
});
