/**
 * @author WMXPY
 * @namespace Debug
 * @description Debugger
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { assertFailedMarkedResult, assertSucceedMarkedResult, assertTerminatedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Debugger) Cases', (): void => {

    const chance = new Chance('integration-debug-debugger');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to throw when debug without interceptor', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate(`deject(${value1});debugger;deject(${value2});`);

        assertFailedMarkedResult(result);

        expect(result.error.code).to.be.equal(ERROR_CODE.DEBUGGER_WITHOUT_DEBUG_INTERCEPTOR);
    });

    it('should be able to handle debug with single debugger - continue', async (): Promise<void> => {

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

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate(`deject(${value1});debugger;deject(${value2});`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.deep.equal([value1, value2]);
        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
            deject: '[Marked Native Function]',
        });
    });

    it('should be able to handle debug with single debugger - terminate', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.terminate();
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate(`deject(${value1});debugger;deject(${value2});`);

        assertTerminatedMarkedResult(result);

        expect(middle).to.be.deep.equal([value1]);
        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
            deject: '[Marked Native Function]',
        });
    });

    it('should be able to handle debug with single debugger - next step', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        let nextStepped: number = 0;
        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            if (nextStepped > 3) {
                flowController.terminate();
            } else {
                nextStepped++;
                flowController.nextStep();
            }
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });
        const value3: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate(`deject(${value1});debugger;deject(${value2});deject(${value3});`);

        assertTerminatedMarkedResult(result);

        expect(middle).to.be.deep.equal([value1, value2]);
        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.scope.getKeyValueObject()).to.be.deep.equal({
            deject: '[Marked Native Function]',
        });
    });
});
