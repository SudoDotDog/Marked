/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import * as Variable_Expressions from 'marked#evaluate/variable';
import { SandList } from 'marked#variable/sandlist';
import { createLiteral, mockLLiteralEvaluator } from '../mock/node';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

describe('Given Variable evaluators', (): void => {

    const chance = new Chance('variable-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <ArrayExpression> evaluator', (): void => {

        it('should return a sandlist instance', async (): Promise<void> => {

            const testNode: EST.ArrayExpression = {

                type: 'ArrayExpression',
                elements: [
                    createLiteral(chance.string()),
                    createLiteral(chance.string()),
                ],
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            const result: any = await Variable_Expressions.arrayExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.instanceof(SandList);
            expect(result).to.be.lengthOf(2);
        });
    });
});
