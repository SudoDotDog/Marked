/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as EST from "estree";
import * as Calculate_Expressions from 'marked#evaluate/calculate';
import { createLiteral, mockLLiteralEvaluator } from '../mock/node';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

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
                right: createLiteral(15),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            const result: any = await Calculate_Expressions.binaryExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(25);
        });
    });

    describe('Given an <LogicalExpression> evaluator', (): void => {

        it('or operator should return operated result', async (): Promise<void> => {

            const testNode: EST.LogicalExpression = {
                type: 'LogicalExpression',
                operator: '||',
                left: createLiteral(true),
                right: createLiteral(false),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            const result: any = await Calculate_Expressions.logicalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(true);
        });

        it('and operator should return operated result', async (): Promise<void> => {

            const testNode: EST.LogicalExpression = {
                type: 'LogicalExpression',
                operator: '&&',
                left: createLiteral(true),
                right: createLiteral(false),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            const result: any = await Calculate_Expressions.logicalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(false);
        });
    });
});
