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

    it('should be able to handle function level throw', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const t=()=>{throw "${message}";};t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });

    it('should be able to handle function level throw with default export', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const t=()=>{throw "${message}";};export default t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });

    it('should be able to handle function level throw with named export', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const t=()=>{throw "${message}";};export const a=t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });

    it('should be able to handle function level throw with declaration', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const t=()=>{throw "${message}";};const a=t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
    });

    it('should be able to handle deep function level throw', async (): Promise<void> => {

        const message: string = chance.string();

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const t=()=>{deject(1);throw "${message}";deject(2);};const r=t()+t();`);

        assertExceptionMarkedResult(result);

        expect(result.exception).to.be.equal(message);
        expect(middle).to.have.lengthOf(1);
        expect(middle[0]).to.be.equal(1);
    });
});
