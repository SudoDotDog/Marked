/**
 * @author WMXPY
 * @namespace MemberExpression_Boolean
 * @description Bigint
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Bigint (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-bigint-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute toString', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const bigint = 1n;`,
            `export default bigint.toString();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('1');
    });

    it('should be able to catch not found error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const bigint = 1n;`,
            `export default bigint.notFound();`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).to.be.equal(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_BIGINT);
    });
});
