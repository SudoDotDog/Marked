/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Loop
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugLineBreakPoint, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Debug (Break Point Loop) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-debug-break-point-loop');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to enter debug multiple times within loop with line break point', async (): Promise<void> => {

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

        const middle: any[] = [];

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate([
            `for(let i=0;i<5;i++){`,
            `deject(i);`,
            `}`,
        ].join(New_Line_Character), [
            MarkedDebugLineBreakPoint.fromLineNumber(2),
        ]);

        assertSucceedMarkedResult(result);

        expect(triggered).toEqual(5);
        expect(middle).toEqual([0, 1, 2, 3, 4]);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getKeyValueObject()).toEqual({});
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(debuggerSnapshot.scope.getParent()!.getKeyValueObject()).toEqual({
            i: 4,
        });
    });
});
