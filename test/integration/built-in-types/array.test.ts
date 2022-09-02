/**
 * @author WMXPY
 * @namespace BuiltInTypes
 * @description Array
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Built-In Types (Array) Cases', (): void => {

    const chance = new Chance('integration-built-in-types-array');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create array and export it', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([value]);
    });

    it('should be able to create array and export its element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s[0];`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(value);
    });

    it('should be able to create string and export its length', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s.length;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(1);
    });
});
