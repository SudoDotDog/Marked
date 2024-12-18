/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Logical Expression
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { logicalExpressionEvaluator } from '../../../src/evaluate/logical-expression';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <LogicalExpression> Evaluators', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('evaluate-logical-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('or operator should return operated result', async (): Promise<void> => {

        const testNode: EST.LogicalExpression = {
            type: 'LogicalExpression',
            operator: '||',
            left: createLiteral(true),
            right: createLiteral(false),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);
        const result: any = await executeWithMock(logicalExpressionEvaluator, testNode);

        expect(result).toEqual(true);
    });

    it('and operator should return operated result', async (): Promise<void> => {

        const testNode: EST.LogicalExpression = {
            type: 'LogicalExpression',
            operator: '&&',
            left: createLiteral(true),
            right: createLiteral(false),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);
        const result: any = await executeWithMock(logicalExpressionEvaluator, testNode);


        expect(result).toEqual(false);
    });
});
