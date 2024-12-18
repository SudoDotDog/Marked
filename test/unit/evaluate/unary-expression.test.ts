/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Unary Expression
 * @override Unit Test
 */


import * as EST from "estree";
import { unaryExpressionEvaluator } from '../../../src/evaluate/unary-expression';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <UnaryExpression> Evaluators', (): void => {

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('should be able to evaluation reverse expression', async (): Promise<void> => {

        const testNode: EST.UnaryExpression = {
            type: 'UnaryExpression',
            operator: '!',
            prefix: true,
            argument: createLiteral(true),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);
        const result: any = await executeWithMock(unaryExpressionEvaluator, testNode);

        expect(result).toBeFalsy();
    });
});
