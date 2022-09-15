/**
 * @author WMXPY
 * @namespace MemberExpression_SandList
 * @description Map
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression Sand List (Map) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-sand-list-map');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute map on number', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [1, 2, 3, 4, 5];`,
            `const result = list.map((each) => each + 1);`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([2, 3, 4, 5, 6]);
    });

    it('should be able to execute map on string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = ["1", "2", "3", "4", "5"];`,
            `const result = list.map((each) => each + "1");`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(["11", "21", "31", "41", "51"]);
    });

    it('should be able to execute map on array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [[1], [2], [3], [4], [5]];`,
            `const result = list.map((each) => [each[0] + 1]);`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([[2], [3], [4], [5], [6]]);
    });

    it('should be able to execute map on object', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const list = [{ "a": 1 }, { "a": 2 }, { "a": 3 }, { "a": 4 }, { "a": 5 }];`,
            `const result = list.map((each) => ({ "a": each.a + 1 }));`,
            `export default result;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(
            [{ "a": 2 }, { "a": 3 }, { "a": 4 }, { "a": 5 }, { "a": 6 }],
        );
    });
});
