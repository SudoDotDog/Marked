/**
 * @author WMXPY
 * @namespace MemberExpression_SandList
 * @description Standard
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { assertFailedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Sand List (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-sand-list-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to throw for not found option', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `export default list.notFound;`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST);
    });
});
