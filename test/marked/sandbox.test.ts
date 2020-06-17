/**
 * @author WMXPY
 * @namespace Marked E2E
 * @description Sandbox Test
 */

import { fail } from 'assert';
import { expect } from 'chai';
import * as Chance from 'chance';
import { ERROR_CODE } from '../../src/declare/error';
import { useEverything } from '../../src/evaluate/evaluate';
import { Sandbox } from '../../src/marked/sandbox';
import { error } from '../../src/util/error/error';

describe('Given Sandbox for sandbox option tests', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('sandbox-configurations');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);
        return sandbox;
    };

    it('should be able to handle code length exceed', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.setOption('maxCodeLength', 1);

        try {
            await sandbox.evaluate(`1+1`);
            fail();
        } catch (err) {
            expect(err.message).to.be.equal(error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED).message);
        }
    });

    it('should be able to get expression count', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        await sandbox.evaluate(`1+2+3+4`);
        expect(sandbox.count).to.be.equal(9);
    });

    it('should be able to break running', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.break();

        try {
            await sandbox.evaluate(`1+1`);
            fail();
        } catch (err) {
            expect(err.message).to.be.equal(error(ERROR_CODE.SANDBOX_IS_BROKE).message);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(sandbox.broke).to.be.true;
        }
    });
});
