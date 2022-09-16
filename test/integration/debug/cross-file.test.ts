/**
 * @author WMXPY
 * @namespace Debug
 * @description Cross File
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Cross File) Cases', (): void => {

    const chance = new Chance('integration-debug-cross-file');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it.only('should be able to cross file debug', async (): Promise<void> => {

        const value: number = chance.integer({ min: 0, max: 100 });

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

        const code: string = [
            `import { func } from 'test'; `,
            `debugger;`,
            `export default func(); `,
        ].join(New_Line_Character);

        const result: MarkedResult = await sandbox.evaluate(code);

        console.log(result);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).to.be.not.null;
        expect(steps).to.be.equal(6);
    });
});
