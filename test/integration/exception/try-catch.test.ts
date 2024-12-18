/**
 * @author WMXPY
 * @namespace Exception
 * @description Try Catch
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Exception (Try Catch) Cases', (): void => {

    const chance = new Chance('integration-exception-try-catch');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle try catch', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const message: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`let a;try {throw "${message}";} catch (error) {}`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toBeUndefined();
    });

    it('should be able to handle try catch with assign error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const message: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`let a;try {throw "${message}";} catch (error) {a=error;}export default a;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(message);
    });

    it('should be able to handle try catch deep error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const message: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`let j;const a=()=>{const b=1;throw "${message}";const c=2;};try {a();} catch (error) {j=error;}export default j;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(message);
    });
});
