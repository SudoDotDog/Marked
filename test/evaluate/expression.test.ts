/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { VARIABLE_TYPE } from 'marked#declare/variable';
import * as Evaluator_Expressions from 'marked#evaluate/expression';
import { SandMap } from 'marked#variable/sandmap';
import { Variable } from 'marked#variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../mock/node';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

describe('Given Expression evaluators', (): void => {

    const chance = new Chance('expression-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <ConditionalExpression> evaluator', (): void => {

        it('positive test should return operated result', async (): Promise<void> => {

            const testNode: EST.ConditionalExpression = {

                type: 'ConditionalExpression',
                test: createLiteral(true),
                consequent: createLiteral(10),
                alternate: createLiteral(15),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            const result: any = await Evaluator_Expressions.conditionalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(10);
        });
    });

    describe('Given an <ForInStatement> evaluator', (): void => {

        it('should get keys one by one', async (): Promise<void> => {

            const value: string = chance.string();
            const testNode: EST.ForInStatement = {

                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'left',
                        },
                    }],
                    kind: 'const',
                },
                right: createIdentifier(value),
                body: {
                    type: 'BlockStatement',
                    body: [],
                },
            };

            sandbox.when('Identifier', (node: EST.Identifier) => new SandMap().set(value, 100));

            await Evaluator_Expressions.forInStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(sandbox.count).to.be.equal(2);
            expect(trace).to.be.lengthOf(1);

            const variable: Variable<any> = scope.children[0].rummage('left') as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });
    });

    describe('Given an <SequenceExpression> evaluator', (): void => {

        it('should evaluate first and return second', async (): Promise<void> => {

            const value: string = chance.string();
            const testNode: EST.SequenceExpression = {

                type: 'SequenceExpression',
                expressions: [
                    createIdentifier('hello'),
                    createLiteral(10),
                ],
            };

            sandbox.when('Identifier', (node: EST.Identifier) => scope.register(VARIABLE_TYPE.CONSTANT)(node.name, value));
            sandbox.when('Literal', mockLLiteralEvaluator);

            const result: any = await Evaluator_Expressions.sequenceExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(10);
            expect(sandbox.count).to.be.equal(2);
            expect(trace).to.be.lengthOf(1);

            const variable: Variable<any> = scope.children[0].rummage('hello') as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });
    });
});
