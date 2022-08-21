/**
 * @author WMXPY
 * @namespace Marked E2E
 * @description Sandbox Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { ERROR_CODE } from '../../../src/declare/error';
import { END_SIGNAL, IMarkedResultFailed, MarkedResult } from '../../../src/declare/evaluate';
import { useEverything } from '../../../src/evaluate/evaluate';
import { Sandbox } from '../../../src/marked/sandbox';
import { error } from '../../../src/util/error/error';

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

        const result: IMarkedResultFailed = await sandbox.evaluate(`1+1`) as IMarkedResultFailed;

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
        expect(result.error.message).to.be.equal(error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED).message);
    });

    it('should be able to get expression count', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        await sandbox.evaluate(`1+2+3+4`);
        expect(sandbox.count).to.be.equal(9);
    });

    it('should be able to use additional argument - no additional for marked', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.setAdditionalArgument(10);

        const result: MarkedResult = await sandbox.evaluate(`const getTen = () => 10;export default getTen();`);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Failed');
        }

        expect(result.exports.default).to.be.equal(10);
    });

    it('should be able to use additional argument - additional for native', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.setAdditionalArgument(10);
        sandbox.inject('getTen', (additionalArg: number) => additionalArg);

        const result: MarkedResult = await sandbox.evaluate(`export default getTen();`);

        if (result.signal !== END_SIGNAL.SUCCEED) {
            throw new Error('Failed');
        }

        expect(result.exports.default).to.be.equal(10);
    });

    it('should be able to break running', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.break();

        const result: IMarkedResultFailed = await sandbox.evaluate(`1+1`) as IMarkedResultFailed;

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
        expect(result.error.message).to.be.equal(error(ERROR_CODE.SANDBOX_IS_BROKE).message);
    });
});
