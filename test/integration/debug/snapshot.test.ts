/**
 * @author WMXPY
 * @namespace Debug
 * @description Snapshot
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedDebugFlowController, MarkedDebugInterceptor, MarkedDebugSnapshot, MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Snapshot) Cases', (): void => {

    const chance = new Chance('integration-debug-snapshot');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get scope info from snapshot - number', async (): Promise<void> => {

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

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'number',
                value: value1,
                native: false,
                mutable: false,
            },
            value2: {
                type: 'number',
                value: value2,
                native: false,
                mutable: true,
            },
        });
    });

    it('should be able to get scope info from snapshot - string', async (): Promise<void> => {

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

        const value1: string = chance.string();

        const result: MarkedResult = await sandbox.evaluate(`const value1="${value1}";debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'string',
                value: value1,
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - boolean', async (): Promise<void> => {

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

        const value1: boolean = chance.bool();

        const result: MarkedResult = await sandbox.evaluate(`const value1=${value1};debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'boolean',
                value: value1,
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - null', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value1=null;debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'null',
                value: null,
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - undefined', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value1=undefined;debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'undefined',
                value: undefined,
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - class', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`class C{a=1};debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            C: {
                type: 'class',
                value: {
                    a: 1,
                },
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - class instance', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`class C{a=1};const c=new C();debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            C: {
                type: 'class',
                value: {
                    a: 1,
                },
                native: false,
                mutable: false,
            },
            c: {
                type: 'class-instance',
                value: {
                    a: 1,
                },
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - list', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value1=[1,2];debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'list',
                value: [1, 2],
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - map', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value1={a:1,b:2};debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value1: {
                type: 'map',
                value: {
                    a: 1,
                    b: 2,
                },
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - regexp', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value=/test/ig;debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value: {
                type: 'regexp',
                value: /test/ig,
                native: false,
                mutable: false,
            },
        });
    });

    it('should be able to get scope info from snapshot - bigint', async (): Promise<void> => {

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

        const result: MarkedResult = await sandbox.evaluate(`const value=10n;debugger;`);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.scope.getDetailedObject()).toEqual({
            value: {
                type: 'bigint',
                value: BigInt(10),
                native: false,
                mutable: false,
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

        expect(debuggerSnapshot).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.startPosition.column).toEqual(14);
        expect(debuggerSnapshot.location.startPosition.line).toEqual(1);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(debuggerSnapshot.location.endPosition.column).toEqual(23);
        expect(debuggerSnapshot.location.endPosition.line).toEqual(1);

        expect(debuggerSnapshot.sliceCodeClip()).toEqual(`debugger;`);
    });

    it('should be able to get location info from snapshot by stepper', async (): Promise<void> => {

        let debuggerSnapshot: MarkedDebugSnapshot = null as any;

        let nextStepped: number = 0;
        const interceptor: MarkedDebugInterceptor = MarkedDebugInterceptor.fromListener((
            snapshot: MarkedDebugSnapshot,
            flowController: MarkedDebugFlowController,
        ) => {
            debuggerSnapshot = snapshot;
            if (nextStepped > 0) {
                flowController.continue();
            } else {
                nextStepped++;
                flowController.nextStep();
            }
        });

        const sandbox: Sandbox = createSandbox();
        sandbox.setDebugInterceptor(interceptor);

        const sourceCode: string = `debugger;const value=0;`;
        const result: MarkedResult = await sandbox.evaluate(sourceCode);

        assertSucceedMarkedResult(result);

        expect(debuggerSnapshot).not.toBeNull();
        expect(debuggerSnapshot.sliceCodeClip()).toEqual(`const value=0;`);
    });
});
