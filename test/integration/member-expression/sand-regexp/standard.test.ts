/**
 * @author WMXPY
 * @namespace MemberExpression_SandRegexp
 * @description Standard
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression SandRegexp (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-sand-regexp-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute test', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const regexp = /hello/;`,
            `export default regexp.test('hello');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toBeTruthy();
    });

    it('should be able to execute toString', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const regexp = /hello/g;`,
            `export default regexp.toString();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('/hello/g');
    });

    it('should be able to catch not found error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const regexp = /hello/;`,
            `export default regexp.notFound();`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_REGEXP);
    });
});
