/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Array Expression
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { arrayExpressionEvaluator } from '../../../src/evaluate/array-expression';
import { SandList } from '../../../src/variable/sand-list';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ArrayExpression> Evaluators', (): void => {

    const chance = new Chance('evaluate-array-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('should return a sandlist instance', async (): Promise<void> => {

        const testNode: EST.ArrayExpression = {

            type: 'ArrayExpression',
            elements: [
                createLiteral(chance.string()),
                createLiteral(chance.string()),
            ],
        };

        sandbox.when('Literal', mockLLiteralEvaluator);

        const result: any = await executeWithMock(arrayExpressionEvaluator, testNode);

        expect(result).toBeInstanceOf(SandList);
        expect(result).toHaveLength(2);
    });
});
