/**
 * @author WMXPY
 * @namespace MemberExpression_Boolean
 * @description Standard
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Boolean (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-boolean-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute toString', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const boolean = true;`,
            `export default boolean.toString();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('true');
    });

    it('should be able to catch not found error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const boolean = true;`,
            `export default boolean.notFound();`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.BOOLEAN_METHOD_NOT_FOUND);
    });
});
