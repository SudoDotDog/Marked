/**
 * @author WMXPY
 * @namespace Optional
 * @description Chain
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Optional (Chain) Cases', (): void => {

    const chance = new Chance('integration-optional-chain');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get result without optional chain', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const map={a:{b:"${value}"}};export default map.a.b;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });

    it('should be able to get result with valid optional chain', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const map={};export default map.a?.b;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.undefined;
    });

    it('should be able to get error without optional chain', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const map={};export default map.a.b;`);

        assertFailedMarkedResult(result);
    });

    it('should be able to get nested error without optional chain', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const map={};export default map.a?.b.c;`);

        assertFailedMarkedResult(result);
    });
});
