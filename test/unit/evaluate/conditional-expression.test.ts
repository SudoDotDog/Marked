/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Conditional Expression
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { conditionalExpressionEvaluator } from '../../../src/evaluate/conditional-expression';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ConditionalExpression> Evaluators', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('evaluate-conditional-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('consequence should be returned of test is true', async (): Promise<void> => {

        const testNode: EST.ConditionalExpression = {

            type: 'ConditionalExpression',
            test: createLiteral(true),
            consequent: createLiteral(true),
            alternate: createLiteral(false),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);

        const result: any = await executeWithMock(conditionalExpressionEvaluator, testNode);

        expect(result).to.be.equal(true);
    });

    it('alternative should be returned of test is false', async (): Promise<void> => {

        const testNode: EST.ConditionalExpression = {

            type: 'ConditionalExpression',
            test: createLiteral(false),
            consequent: createLiteral(true),
            alternate: createLiteral(false),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);

        const result: any = await executeWithMock(conditionalExpressionEvaluator, testNode);

        expect(result).to.be.equal(false);
    });
});
