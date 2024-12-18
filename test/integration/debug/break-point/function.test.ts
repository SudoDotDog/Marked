/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Function
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugLineBreakPoint, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Debug (Break Point Function) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-debug-break-point-loop');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to enter debug multiple times within function nest with line break point', async (): Promise<void> => {

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
            `const test = () => {`,
            `deject(1);`,
            `}`,
            `test();`,
            `test();`,
        ].join(New_Line_Character), [
            MarkedDebugLineBreakPoint.fromLineNumber(2),
        ]);

        assertSucceedMarkedResult(result);

        expect(triggered).toEqual(2);
        expect(middle).toEqual([1, 1]);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getKeyValueObject()).toEqual({});
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(debuggerSnapshot.scope.getParent()!.getParent()!.getKeyValueObject()).toEqual({
            test: `[Marked Function]`,
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(debuggerSnapshot.scope.getParent()!.getParent()!.getParent()!.getKeyValueObject()).toEqual({
            deject: `[Marked Native Function]`,
        });
    });
});
