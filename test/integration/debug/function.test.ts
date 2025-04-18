/**
 * @author WMXPY
 * @namespace Debug
 * @description Function
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Function) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-debug-function');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it('should be able to resolve function declaration scenario', async (): Promise<void> => {

        const code: string = [
            `debugger;`,
            `let value=0;`,
            `function test() {`,
            `   value++;`,
            `}`,
            `test();`,
            `export default value;`,
        ].join(New_Line_Character);

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        let steps: number = 0;
        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            steps++;
            debuggerSnapshot = snapshot;
            flowController.nextStep();
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const result: MarkedResult = await sandbox.evaluate(code);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(steps).toEqual(6);
    });
});
