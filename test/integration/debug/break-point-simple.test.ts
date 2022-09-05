/**
 * @author WMXPY
 * @namespace Debug
 * @description Break Point
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugLineBreakPoint, MarkedDebugRangeBreakPoint, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

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
        ].join('\n'), [
            MarkedDebugLineBreakPoint.fromLineNumber(2),
        ]);

        assertSucceedMarkedResult(result);

        expect(triggered).to.be.equal(1);

        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
            value1,
        });
    });

    it('should be able to enter debug with range break point', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(
            `const value1="value1";const value2="value2";`,
            [
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                MarkedDebugRangeBreakPoint.fromRangeStart(24),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(triggered).to.be.equal(1);

        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
            value1: "value1",
        });
    });

    it('should be able to enter debug with range break point - not hit path', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(
            `const value1="value1";const value2="value2";`,
            [
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                MarkedDebugRangeBreakPoint.fromRangeStart(20),
            ],
        );

        assertSucceedMarkedResult(result);

        expect(triggered).to.be.equal(1);

        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
        });
    });
});
