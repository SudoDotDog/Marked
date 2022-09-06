/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

import { expect } from 'chai';
import * as EST from "estree";
import * as Calculate_Expressions from '../../../src/evaluate/calculate';
import { Sandbox } from '../../../src/marked/sandbox';
import { Scope } from '../../../src/variable/scope';
import { Trace } from '../../../src/variable/trace/trace';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';

describe('Given Calculation evaluators', (): void => {

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    describe('Given an <BinaryExpression> evaluator', (): void => {

        it('plus operator should return operated result', async (): Promise<void> => {

            const testNode: EST.BinaryExpression = {
                type: 'BinaryExpression',
                operator: '+',
                left: createLiteral(10),
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                right: createLiteral(15),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            const result: any = await Calculate_Expressions.binaryExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            expect(result).to.be.equal(25);
        });
    });
});
