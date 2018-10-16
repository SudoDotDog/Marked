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
import { getBinaryOperation } from 'marked#util/operation';
import { SandList } from 'marked#variable/sandlist';
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

        it('consequence should be returned of test is true', async (): Promise<void> => {

            const testNode: EST.ConditionalExpression = {
                type: 'ConditionalExpression',
                test: createLiteral(true),
                consequent: createLiteral(true),
                alternate: createLiteral(false),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            const result: any = await Evaluator_Expressions.conditionalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

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
            const result: any = await Evaluator_Expressions.conditionalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(false);
        });
    });

    describe('Given an <DoWhileStatement> evaluator', (): void => {

        it('should do expression while the test is working', async (): Promise<void> => {

            const value: string = chance.string();
            const result: any[] = [];
            const getLeft: () => number = () => {
                return result.length;
            };

            const testNode: EST.DoWhileStatement = {

                type: 'DoWhileStatement',
                test: {
                    type: 'BinaryExpression',
                    left: getLeft as any,
                    right: createLiteral(5),
                    operator: '<',
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: createIdentifier(value),
                },
            };

            sandbox.when('BinaryExpression', (node: EST.BinaryExpression) => {

                const operation: any = getBinaryOperation(node.operator) as any;
                const left: number = (node.left as any)();
                const right: number = (node.right as EST.Literal).value as number;
                return operation(left, right);
            });
            sandbox.when('ExpressionStatement', (node: EST.ExpressionStatement) => sandbox.execute(node.expression, scope, trace));
            sandbox.when('Identifier', (node: EST.Identifier) => result.push(node.name));

            await Evaluator_Expressions.doWhileStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(sandbox.count).to.be.equal(15);
            expect(trace).to.be.lengthOf(1);
            expect(result).to.be.lengthOf(5);
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

            sandbox.when('Identifier', (node: EST.Identifier) => new SandMap<any>().set(value, 100));

            await Evaluator_Expressions.forInStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(sandbox.count).to.be.equal(2);
            const variable: Variable<any> = scope.children[0].rummage('left') as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });
    });

    describe('Given an <ForOfStatement> evaluator', (): void => {

        it('should get value one by one', async (): Promise<void> => {

            const value: string = chance.string();
            const testNode: EST.ForOfStatement = {

                type: 'ForOfStatement',
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

            sandbox.when('Identifier', (node: EST.Identifier) => new SandList<number>([1, 2, 3, 4, 5]));

            await Evaluator_Expressions.forOfStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(sandbox.count).to.be.equal(6);
            expect(scope.children).to.be.lengthOf(5);
            scope.children.forEach((child: MockScope, index: number) =>
                expect((child.rummage('left') as Variable<number>).get()).to.be.equal(index + 1));
        });
    });

    describe('Given an <WhileStatement> evaluator', (): void => {

        it('should do expression while the test is working', async (): Promise<void> => {

            const value: string = chance.string();
            const result: any[] = [];
            const getLeft: () => number = () => {
                return result.length;
            };

            const testNode: EST.WhileStatement = {

                type: 'WhileStatement',
                test: {
                    type: 'BinaryExpression',
                    left: getLeft as any,
                    right: createLiteral(5),
                    operator: '<',
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: createIdentifier(value),
                },
            };

            sandbox.when('BinaryExpression', (node: EST.BinaryExpression) => {

                const operation: any = getBinaryOperation(node.operator) as any;
                const left: number = (node.left as any)();
                const right: number = (node.right as EST.Literal).value as number;
                return operation(left, right);
            });
            sandbox.when('ExpressionStatement', (node: EST.ExpressionStatement) => sandbox.execute(node.expression, scope, trace));
            sandbox.when('Identifier', (node: EST.Identifier) => result.push(node.name));

            await Evaluator_Expressions.whileStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(sandbox.count).to.be.equal(16);
            expect(result).to.be.lengthOf(5);
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

            const variable: Variable<any> = scope.rummage('hello') as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });
    });
});
