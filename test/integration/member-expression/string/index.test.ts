/**
 * @author WMXPY
 * @namespace MemberExpression_String
 * @description Index
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../../src';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression String (Index) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-string-index');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get index from string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string[0];`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('h');
    });
});
