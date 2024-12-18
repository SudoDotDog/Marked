/**
 * @author WMXPY
 * @namespace RootReturn
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Root Return (Simple) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-root-return-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to return result with root return', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `return 10;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.rootReturn.hasRootReturn).toBeTruthy();
        expect((result.rootReturn as any).returnValue).toEqual(10);
    });
});
