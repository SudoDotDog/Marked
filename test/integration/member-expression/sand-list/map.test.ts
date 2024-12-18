/**
 * @author WMXPY
 * @namespace MemberExpression_SandList
 * @description Map
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Sand List (Map) Cases', (): void => {

    const chance = new Chance('integration-member-expression-sand-list-map');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to throw for invalid map', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `const result = list.map("");`,
            `export default result;`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).toEqual(ERROR_CODE.LIST_MAP_ARGUMENT_SHOULD_BE_A_FUNCTION);
    });

    it('should be able to execute map on number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `const result = list.map((each) => each + 1);`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual([2, 3, 4, 5, 6]);
    });

    it('should be able to execute map on string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = ["1", "2", "3", "4", "5"];`,
            `const result = list.map((each) => each + "1");`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(["11", "21", "31", "41", "51"]);
    });

    it('should be able to execute map on array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [[1], [2], [3], [4], [5]];`,
            `const result = list.map((each) => [each[0] + 1]);`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual([[2], [3], [4], [5], [6]]);
    });

    it('should be able to execute map on object', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [{ "a": 1 }, { "a": 2 }, { "a": 3 }, { "a": 4 }, { "a": 5 }];`,
            `const result = list.map((each) => ({ "a": each.a + 1 }));`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(
            [{ "a": 2 }, { "a": 3 }, { "a": 4 }, { "a": 5 }, { "a": 6 }],
        );
    });

    it('should be able to execute map on number with additional argument', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.setAdditionalArgument(chance.string());

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `const result = list.map((each) => each + 1);`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual([2, 3, 4, 5, 6]);
    });
});
