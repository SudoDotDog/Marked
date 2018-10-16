/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ERROR_CODE } from 'marked#declare/error';
import { VARIABLE_TYPE } from 'marked#declare/variable';
import * as Variable_Expressions from 'marked#evaluate/variable';
import { error } from 'marked#util/error/error';
import { SandList } from 'marked#variable/sandlist';
import { SandMap } from 'marked#variable/sandmap';
import { Variable } from 'marked#variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../mock/node';
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

    describe('Given an <AssignmentExpression> evaluator', (): void => {

        it('should be able to assign variable', async (): Promise<void> => {

            const variableName: string = chance.string();
            const value: number = chance.integer();

            scope.register(VARIABLE_TYPE.SCOPED)(variableName, undefined);
            const testNode: EST.AssignmentExpression = {

                type: 'AssignmentExpression',
                operator: '=',
                left: createIdentifier(variableName),
                right: createLiteral(value),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            await Variable_Expressions.assignmentExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });

        it('should be able to assign member', async (): Promise<void> => {

            const variableName: string = chance.string();
            const objectName: string = chance.string();
            const value: number = chance.integer({ min: 10, max: 50 });

            scope.register(VARIABLE_TYPE.SCOPED)(variableName, new SandMap<number>({
                [objectName]: value,
            }));
            const testNode: EST.AssignmentExpression = {

                type: 'AssignmentExpression',
                operator: '+=',
                left: {
                    type: 'MemberExpression',
                    object: createIdentifier(variableName),
                    property: createIdentifier(objectName),
                    computed: false,
                },
                right: createLiteral(value),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            sandbox.when('Identifier', (node: EST.Identifier) => {

                const rummaged: Variable<any> | null = scope.rummage(node.name);
                if (rummaged) return rummaged.get();
                throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.name);
            });

            const result = await Variable_Expressions.assignmentExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(value);

            const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
            expect((variable as Variable<SandMap<number>>).get().get(objectName)).to.be.equal(value + value);
        });
    });
});
