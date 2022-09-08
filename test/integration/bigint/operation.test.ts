/**
 * @author WMXPY
 * @namespace RegExp
 * @description Operation
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

/* eslint-disable @typescript-eslint/no-magic-numbers */
describe('Given Integration BiInt (Operation) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-bigint-operation');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create perform bigint plus operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=1n+1n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint minus operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=3n-1n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint times operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=2n*1n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint divide operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=4n/2n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint remaining operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=7n%5n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint plus operation with number at back', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=1n+1;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint plus operation with number at front', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=1+1n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint minus operation with number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=3n-1;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint times operation with number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=2n*1;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint divide operation with number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=4n/2;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });

    it('should be able to create perform bigint remaining operation with number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const bigint=7n%5;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(BigInt(2));
    });
});
