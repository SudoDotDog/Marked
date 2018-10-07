/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as EST from "estree";
import { binaryExpressionEvaluator, logicalExpressionEvaluator } from 'marked#evaluate/calculate';
import { literal } from '../mock/node';
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
                left: literal(10),
                right: literal(15),
            };

            sandbox.when('Literal', (node: EST.Literal) => {
                return node.value;
            });

            const result: any = await binaryExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(25);
        });
    });

    describe('Given an <LogicalExpression> evaluator', (): void => {

        it('or operator should return operated result', async (): Promise<void> => {

            const testNode: EST.LogicalExpression = {
                type: 'LogicalExpression',
                operator: '||',
                left: literal(true),
                right: literal(false),
            };

            sandbox.when('Literal', (node: EST.Literal) => {
                return node.value;
            });

            const result: any = await logicalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(true);
        });

        it('and operator should return operated result', async (): Promise<void> => {

            const testNode: EST.LogicalExpression = {
                type: 'LogicalExpression',
                operator: '&&',
                left: literal(true),
                right: literal(false),
            };

            sandbox.when('Literal', (node: EST.Literal) => {
                return node.value;
            });

            const result: any = await logicalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(false);
        });
    });
});
