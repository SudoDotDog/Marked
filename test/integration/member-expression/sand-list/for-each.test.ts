/**
 * @author WMXPY
 * @namespace MemberExpression_SandList
 * @description For Each
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Sand List (Filter) For Each', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-sand-list-for-each');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to throw for invalid for each', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `list.forEach("");`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.LIST_FOR_EACH_ARGUMENT_SHOULD_BE_A_FUNCTION);
    });

    it('should be able to execute for each', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (value: any) => {
            middle.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `list.forEach((each) => deject(each));`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(middle).toEqual([1, 2, 3, 4, 5]);
    });
});
