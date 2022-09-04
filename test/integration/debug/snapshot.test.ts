/**
 * @author WMXPY
 * @namespace Debug
 * @description Snapshot
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Snapshot) Cases', (): void => {

    const chance = new Chance('integration-debug-snapshot');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get scope info from snapshot', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        const result: MarkedResult = await sandbox.evaluate(`const value1=${value1};let value2=${value2};debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getDetailedObject()).to.be.deep.equal({
            value1: {
                value: value1,
                mutable: false,
            },
            value2: {
                value: value2,
                mutable: true,
            },
        });
    });

    it('should be able to get location info from snapshot', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const sourceCode: string = `const value=0;debugger;`;
        const result: MarkedResult = await sandbox.evaluate(sourceCode);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).to.be.not.null;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.startPosition.column).to.be.equal(14);
        expect(debuggerSnapshot.location.startPosition.line).to.be.equal(1);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.endPosition.column).to.be.equal(23);
        expect(debuggerSnapshot.location.endPosition.line).to.be.equal(1);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.startRange).to.be.equal(14);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.endRange).to.be.equal(23);

        expect(debuggerSnapshot.sliceCodeClip(sourceCode)).to.be.equal(`debugger;`);
    });
});
