/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Empty Statement
 * @override E2E Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <EmptyStatement> Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('sandbox-empty-statement');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle empty statement', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(";export default 1;;");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(1);
    });
});
