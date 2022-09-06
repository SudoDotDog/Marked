/**
 * @author WMXPY
 * @namespace OptionalChain
 * @description Simple
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe.only('Given Integration Optional Chain (Simple) Cases', (): void => {

    const chance = new Chance('integration-optional-chain-simple');

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

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const map={a:{b:"${value}"}};export default map.a?.b;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });
});
