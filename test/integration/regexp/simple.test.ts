/**
 * @author WMXPY
 * @namespace RegExp
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration RegExp (Simple) Cases', (): void => {

    const chance = new Chance('integration-regexp-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create regular expression', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const regexp=/${value}/;export default regexp;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(new RegExp(value));
    });

    it('should be able to create regular expression with flags', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`const regexp=/${value}/ig;export default regexp;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(new RegExp(value, 'ig'));
    });
});
