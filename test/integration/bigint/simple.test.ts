/**
 * @author WMXPY
 * @namespace RegExp
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

/* eslint-disable @typescript-eslint/no-magic-numbers */
describe('Given Integration BigInt (Simple) Cases', (): void => {

    const chance = new Chance('integration-bigint-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create bigint value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 0, max: 100 });

        const result: MarkedResult = await sandbox.evaluate(`const bigint=${value}n;export default bigint;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(BigInt(value));
    });
});
