/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { VARIABLE_TYPE } from '../../src/declare/variable';
import * as Evaluator_Expressions from '../../src/evaluate/expression';
import { getBinaryOperation } from '../../src/util/operation';
import { Flag } from '../../src/variable/flag';
import { SandList } from '../../src/variable/sandlist';
import { SandMap } from '../../src/variable/sandmap';
import { Variable } from '../../src/variable/variable';
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

    describe('Given an <ArrowFunctionExpression> evaluator', (): void => {

        it('should be able to handle function expression', async (): Promise<void> => {

            const param: string = chance.string();
            const value: string = chance.string();
            const argument: string = chance.string();

            const result: any[] = [];
            const testNode: EST.ArrowFunctionExpression = {

                type: 'ArrowFunctionExpression',
                expression: false,
                params: [createIdentifier(param)],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'MockStatement',
                        value,
                    } as any],
                },
            };

            sandbox.when('Identifier', (node: EST.Identifier) => node.name);
            sandbox.when('BlockStatement', (node: EST.BlockStatement) => node.body
                .forEach(async (element: EST.Statement) => await sandbox.execute(element, scope, trace)));
            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            const func: any = await Evaluator_Expressions.arrowFunctionEvaluator.bind(sandbox)(testNode, scope, trace);
            expect(func).to.be.instanceof(Function);

            func(argument);
            expect(result).to.be.deep.equal([value]);

            const mockedChildScope: MockScope = scope.children[0];
            expect((mockedChildScope.constants.get(param) as any).get()).to.be.equal(argument);
        });
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

    describe('Given an <IfStatement> evaluator', (): void => {

        it('should be able to handle if statement - happy path', async (): Promise<void> => {

            const value: string = chance.string();

            const result: any[] = [];
            const testNode: EST.IfStatement = {

                type: 'IfStatement',
                test: createLiteral(true),
                consequent: {
                    type: 'MockStatement',
                    value,
                } as any,
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            await Evaluator_Expressions.ifStatementEvaluator.bind(sandbox)(testNode, scope, trace);
            expect(result).to.be.deep.equal([value]);
        });

        it('should be able to handle if statement - sad path', async (): Promise<void> => {

            const value: string = chance.string();
            const sadValue: string = chance.string();

            const result: any[] = [];
            const testNode: EST.IfStatement = {

                type: 'IfStatement',
                test: createLiteral(false),
                consequent: {
                    type: 'MockStatement',
                    value,
                } as any,
                alternate: {
                    type: 'MockStatement',
                    value: sadValue,
                } as any,
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            await Evaluator_Expressions.ifStatementEvaluator.bind(sandbox)(testNode, scope, trace);
            expect(result).to.be.deep.equal([sadValue]);
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

            sandbox.when('Identifier', (node: EST.Identifier) => new SandMap<any>().set(value, undefined));

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

    describe('Given an <FunctionDeclare> evaluator', (): void => {

        it('should return a executable function', async (): Promise<void> => {

            const name: string = chance.string();
            const param: string = chance.string();

            const testNode: EST.FunctionDeclaration = {

                type: 'FunctionDeclaration',
                id: createIdentifier(name),
                params: [createIdentifier(param)],
                body: {
                    type: 'BlockStatement',
                    body: [],
                },
            };

            sandbox.when('Identifier', (node: EST.Identifier) => node.name);
            sandbox.when('BlockStatement', (node: EST.BlockStatement) => node.body
                .forEach(async (element: EST.Statement) => await sandbox.execute(element, scope, trace)));

            const result: any = await Evaluator_Expressions.functionDeclarationEvaluator.bind(sandbox)(testNode, scope, trace);
            expect(result).to.be.instanceof(Function);
        });
    });

    describe('Given an <FunctionExpression> evaluator', (): void => {

        it('should be able to handle function expression', async (): Promise<void> => {

            const name: string = chance.string();
            const param: string = chance.string();
            const value: string = chance.string();
            const argument: string = chance.string();

            const result: any[] = [];
            const testNode: EST.FunctionExpression = {

                type: 'FunctionExpression',
                id: createIdentifier(name),
                params: [createIdentifier(param)],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'MockStatement',
                        value,
                    } as any],
                },
            };

            sandbox.when('Identifier', (node: EST.Identifier) => node.name);
            sandbox.when('BlockStatement', (node: EST.BlockStatement) => node.body
                .forEach(async (element: EST.Statement) => await sandbox.execute(element, scope, trace)));
            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            const func: any = await Evaluator_Expressions.functionExpressionEvaluator.bind(sandbox)(testNode, scope, trace);
            expect(func).to.be.instanceof(Function);

            func(argument);
            expect(result).to.be.deep.equal([value]);

            const mockedChildScope: MockScope = scope.children[0];
            expect((mockedChildScope.constants.get(param) as any).get()).to.be.equal(argument);
        });
    });

    describe('Given an <SwitchStatement> and <SwitchCase> evaluator', (): void => {

        it('should be able to handle switch cases', async (): Promise<void> => {

            const discriminant: number = chance.integer({ min: 1, max: 3 });

            const result: any[] = [];
            const testNode: EST.SwitchStatement = {

                type: 'SwitchStatement',
                discriminant: createLiteral(discriminant),
                cases: [1, 2, 3].map((value: number): EST.SwitchCase => ({
                    type: 'SwitchCase',
                    test: createLiteral(value),
                    consequent: [{
                        type: 'MockStatement',
                        value,
                    } as any, {
                        type: 'BreakStatement',
                    }],
                })),
            };

            sandbox.when('Identifier', (node: EST.Identifier) => node.name);
            sandbox.when('Literal', mockLLiteralEvaluator);
            sandbox.when('BreakStatement', (node: EST.BreakStatement) => Flag.fromBreak());

            sandbox.when('SwitchCase', Evaluator_Expressions.switchCaseEvaluator);
            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            await Evaluator_Expressions.switchExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.deep.equal([discriminant]);
        });
    });
});
