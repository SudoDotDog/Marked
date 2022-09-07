/**
 * @author WMXPY
 * @namespace Debug
 * @description Location
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Location) Cases', (): void => {

    const chance = new Chance('integration-debug-location');

    const createJavaScriptSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('javascript');
        return sandbox;
    };

    const createTypeScriptSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it('should be able to find location for javascript', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createJavaScriptSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const sourceCode: string = [
            `deject(${value1});`,
            `debugger;`,
            `deject(${value2});`,
        ].join(New_Line_Character);

        const result: MarkedResult = await sandbox.evaluate(sourceCode);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.deep.equal([value1, value2]);
        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.location.sliceCodeClip(sourceCode)).to.be.equal('debugger;');
    });

    it('should be able to find location for typescript', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createTypeScriptSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const sourceCode: string = [
            `deject(${value1});`,
            `debugger;`,
            `deject(${value2});`,
        ].join(New_Line_Character);

        const result: MarkedResult = await sandbox.evaluate(sourceCode);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.deep.equal([value1, value2]);
        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.location.sliceCodeClip(sourceCode)).to.be.equal('debugger;');
    });

    it('should be able to find location for typescript - single line joined', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            flowController.continue();
        });

        const sandbox: Sandbox = createTypeScriptSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const sourceCode: string = [
            `const a:number=1;debugger;`,
        ].join(New_Line_Character);

        const result: MarkedResult = await sandbox.evaluate(sourceCode);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).to.be.not.null;
        expect(debuggerSnapshot.location.sliceCodeClip(sourceCode)).to.be.equal('debugger;');
    });
});
