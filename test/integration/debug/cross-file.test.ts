/**
 * @author WMXPY
 * @namespace Debug
 * @description Cross File
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Cross File) Cases', (): void => {

    const chance = new Chance('integration-debug-cross-file');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it('should be able to cross file debug', async (): Promise<void> => {

        const value: number = chance.integer({ min: 0, max: 100 });

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const code: string = [
            `import { func } from 'test'; `,
            `debugger;`,
            `export default func(); `,
        ].join(New_Line_Character);

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

        sandbox.resolver(() => {
            return {
                script: [
                    `export const func = () => {`,
                    `return ${value};`,
                    `};`,
                ].join(New_Line_Character),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });
        sandbox.setDebugInterceptor(interceptor);

        const result: MarkedResult = await sandbox.evaluate(code);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(steps).toEqual(4);
    });
});
