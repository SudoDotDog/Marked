/**
 * @author WMXPY
 * @namespace MemberExpression_Number
 * @description Standard
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Number (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-number-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute toFixed', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const number = 1.23456789;`,
            `export default number.toFixed(2);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('1.23');
    });

    it('should be able to execute toPrecision', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const number = 1.23456789;`,
            `export default number.toPrecision(2);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('1.2');
    });

    it('should be able to execute toString', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const number = 1.23456789;`,
            `export default number.toString();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('1.23456789');
    });

    it('should be able to catch not found error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const number = 1.23456789;`,
            `export default number.notFound();`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.NUMBER_METHOD_NOT_FOUND);
    });
});
