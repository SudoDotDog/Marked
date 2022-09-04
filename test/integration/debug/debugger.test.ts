/**
 * @author WMXPY
 * @namespace Exception
 * @description Debugger
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { assertFailedMarkedResult } from '../../util/assert-result';

describe('Given Integration Debug (Debugger) Cases', (): void => {

    const chance = new Chance('integration-debug-debugger');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it.only('should be able to throw when debug without interceptor', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });

        sandbox.inject('deject', (content: any) => middle.push(content));

        const result: MarkedResult = await sandbox.evaluate(`deject(${value1});debugger;deject(${value2});`);

        assertFailedMarkedResult(result);

        expect(result.error.code).to.be.equal(ERROR_CODE.DEBUGGER_WITHOUT_DEBUG_INTERCEPTOR);
    });
});
