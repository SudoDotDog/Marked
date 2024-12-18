/**
 * @author WMXPY
 * @namespace BuiltInTypes
 * @description Array
 * @override Integration Test
 */

import Chance from "chance";
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

        expect(result.exports.default).toEqual([value]);
    });

    it('should be able to create array and export its element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s[0];`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(value);
    });

    it('should be able to create string and export its length', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s.length;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(1);
    });

    it('should be able to map array value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const s=["${value}"];export default s.map((item) => item + "PLUS");`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual([`${value}PLUS`]);
    });

    it('should be able to filter array value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`const s=[1,2,3,4];export default s.filter((item) => item >= 2);`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual([2, 3, 4]);
    });
});
