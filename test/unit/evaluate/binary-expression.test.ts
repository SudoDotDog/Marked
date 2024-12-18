/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Binary Expression
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { binaryExpressionEvaluator } from '../../../src/evaluate/binary-expression';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <BinaryExpression> Evaluators', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('evaluate-binary-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('plus operator should return operated result', async (): Promise<void> => {

        const testNode: EST.BinaryExpression = {
            type: 'BinaryExpression',
            operator: '+',
            left: createLiteral(10),
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            right: createLiteral(15),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);
        const result: any = await executeWithMock(binaryExpressionEvaluator, testNode);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result).toEqual(25);
    });
});
