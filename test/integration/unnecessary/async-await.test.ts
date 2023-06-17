/**
 * @author WMXPY
 * @namespace Unnecessary
 * @description Async Await
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { error } from '../../../src/util/error/error';
import { assertFailedMarkedResult } from '../../util/assert-result';

describe('Given Integration Unnecessary (Async Await) Cases', (): void => {

    const chance = new Chance('integration-unnecessary-async-await');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to detect unnecessary await expression', async (): Promise<void> => {

        const word: string = chance.word();

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `await execute('${word}');`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.message).to.be.equal(error(ERROR_CODE.UNNECESSARY_AWAIT_EXPRESSION).message);
    });

    it('should be able to detect unnecessary async expression', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `async () => {};`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.message).to.be.equal(error(ERROR_CODE.UNNECESSARY_ASYNC_EXPRESSION).message);
    });
});
