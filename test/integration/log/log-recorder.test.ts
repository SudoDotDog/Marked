/**
 * @author WMXPY
 * @namespace Log
 * @description Log Recorder
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { IMarkedExecuteLog, MarkedLogRecorder, MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Log (Log Recorder) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-log-log-recorder');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to record log with log recorder', async (): Promise<void> => {

        const recorder = MarkedLogRecorder.create();

        const sandbox: Sandbox = createSandbox();
        sandbox.addLogRecorder(recorder);

        const result: MarkedResult = await sandbox.evaluate([
            `return 10;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(recorder).to.be.lengthOf(3);
    });

    it('should be able to record log with multiple log recorder', async (): Promise<void> => {

        const recorder1 = MarkedLogRecorder.create();
        const recorder2 = MarkedLogRecorder.create();

        const sandbox: Sandbox = createSandbox();
        sandbox.addLogRecorder(recorder1);
        sandbox.addLogRecorder(recorder2);

        const result: MarkedResult = await sandbox.evaluate([
            `return 10;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(recorder1).to.be.lengthOf(3);
        expect(recorder2).to.be.lengthOf(3);
    });

    it('should be able to find logs by line before', async (): Promise<void> => {

        const recorder = MarkedLogRecorder.create();

        const sandbox: Sandbox = createSandbox();
        sandbox.addLogRecorder(recorder);

        const result: MarkedResult = await sandbox.evaluate([
            `const line1 = 1;`,
            `const line2 = 2;`,
            `const line3 = 3;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        const logs: IMarkedExecuteLog[] = recorder.findExecuteLogsByLineBefore(2);

        expect(logs).to.be.lengthOf(4);
    });

    it('should be able to find logs by line after', async (): Promise<void> => {

        const recorder = MarkedLogRecorder.create();

        const sandbox: Sandbox = createSandbox();
        sandbox.addLogRecorder(recorder);

        const result: MarkedResult = await sandbox.evaluate([
            `const line1 = 1;`,
            `const line2 = 2;`,
            `const line3 = 3;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        const logs: IMarkedExecuteLog[] = recorder.findExecuteLogsByLingAfter(2);

        expect(logs).to.be.lengthOf(4);
    });

    it('should be able to find logs by line between', async (): Promise<void> => {

        const recorder = MarkedLogRecorder.create();

        const sandbox: Sandbox = createSandbox();
        sandbox.addLogRecorder(recorder);

        const result: MarkedResult = await sandbox.evaluate([
            `const line1 = 1;`,
            `const line2 = 2;`,
            `const line3 = 3;`,
            `const line4 = 4;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        const logs: IMarkedExecuteLog[] = recorder.findExecuteLogsByLineBetween(2, 3);

        expect(logs).to.be.lengthOf(4);
    });
});
