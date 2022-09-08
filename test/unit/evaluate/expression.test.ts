/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ScriptLocation } from '../../../src/declare/script-location';
import { VARIABLE_TYPE } from '../../../src/declare/variable';
import * as Evaluator_Expressions from '../../../src/evaluate/expression';
import { Sandbox } from '../../../src/marked/sandbox';
import { getBinaryOperation } from '../../../src/operation/binary-expression/operators';
import { RawSourceMapLocationFinder } from '../../../src/source-map/location-finder/raw';
import { Flag } from '../../../src/variable/flag';
import { SandList } from '../../../src/variable/sand-list';
import { SandMap } from '../../../src/variable/sand-map';
import { Scope } from '../../../src/variable/scope';
import { Trace } from '../../../src/variable/trace/trace';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';

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

            await Evaluator_Expressions.doWhileStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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

            await Evaluator_Expressions.ifStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);
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

            await Evaluator_Expressions.ifStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);
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

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sandbox.when('Identifier', (node: EST.Identifier) => new SandMap<any>().set(value, undefined));

            await Evaluator_Expressions.forInStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);
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
                await: false,
                right: createIdentifier(value),
                body: {
                    type: 'BlockStatement',
                    body: [],
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sandbox.when('Identifier', (node: EST.Identifier) => SandList.create([1, 2, 3, 4, 5]));

            await Evaluator_Expressions.forOfStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

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

            await Evaluator_Expressions.whileStatementEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);
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

            const result: any = await Evaluator_Expressions.sequenceExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);
            expect(result).to.be.equal(10);
            expect(sandbox.count).to.be.equal(2);
            expect(trace).to.be.lengthOf(1);

            const variable: Variable<any> = scope.rummage('hello') as Variable<any>;
            expect(variable.get()).to.be.equal(value);
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sandbox.when('BreakStatement', (node: EST.BreakStatement) => Flag.fromBreak(
                Trace.init(
                    ScriptLocation.createRoot(),
                    RawSourceMapLocationFinder.fromEmpty(),
                ),
            ));

            sandbox.when('SwitchCase', Evaluator_Expressions.switchCaseEvaluator);
            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            await Evaluator_Expressions.switchExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.deep.equal([discriminant]);
        });
    });
});
