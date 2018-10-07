/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as EST from "estree";
import { conditionalExpressionEvaluator } from 'marked#evaluate/expression';
import { literal } from '../mock/node';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

describe('Given Expression evaluators', (): void => {

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    describe('Given an <ConditionalExpression> evaluator', (): void => {

        it('positive test should return operated result', async (): Promise<void> => {

            const testNode: EST.ConditionalExpression = {
                type: 'ConditionalExpression',
                test: literal(true),
                consequent: literal(10),
                alternate: literal(15),
            };

            sandbox.when('Literal', (node: EST.Literal) => node.value);

            const result: any = await conditionalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(10);
        });
    });
});
