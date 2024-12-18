/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugLineBreakPoint, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Debug (Break Point Simple) Cases', (): void => {

    const chance = new Chance('integration-debug-break-point-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to enter debug with line break point', async (): Promise<void> => {

        let triggered: number = 0;
        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            triggered++;
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        const result: MarkedResult = await sandbox.evaluate([
            `const value1=${value1};`,
            `const value2=${value2};`,
        ].join(New_Line_Character), [
            MarkedDebugLineBreakPoint.fromLineNumber(2),
        ]);

        assertSucceedMarkedResult(result);

        expect(triggered).toEqual(1);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getKeyValueObject()).toEqual({
            value1,
        });
    });
});
