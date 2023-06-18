/**
 * @author WMXPY
 * @namespace Log
 * @description Log Recorder
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedLogRecorder, MarkedResult, New_Line_Character, Sandbox } from '../../../src';
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

        expect(recorder.executeLogs).to.be.lengthOf(3);
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

        expect(recorder1.executeLogs).to.be.lengthOf(3);
        expect(recorder2.executeLogs).to.be.lengthOf(3);
    });
});
