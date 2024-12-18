/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Return Statement
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { returnStatementEvaluator } from '../../../src/evaluate/return-statement';
import { Flag } from '../../../src/variable/flag';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ReturnStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-return-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('should return a return flag', async (): Promise<void> => {

        const testNode: EST.ReturnStatement = {

            type: 'ReturnStatement',
        };

        const result: Flag = await executeWithMock(returnStatementEvaluator, testNode);

        expect(result).toBeInstanceOf(Flag);
        expect(result.isReturn()).toBeTruthy();
    });

    it('should be able to contain value with return flag', async (): Promise<void> => {

        const payload: string = chance.string();

        const testNode: EST.ReturnStatement = {

            type: 'ReturnStatement',
            argument: createLiteral(payload),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);

        const result: Flag = await executeWithMock(returnStatementEvaluator, testNode);

        expect(result).toBeInstanceOf(Flag);
        expect(result.isReturn()).toBeTruthy();
        expect(result.getValue()).toEqual(payload);
    });
});
