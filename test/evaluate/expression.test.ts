/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as EST from "estree";
import * as Evaluator_Expressions from 'marked#evaluate/expression';
import { SandMap } from 'marked#variable/sandmap';
import { Variable } from 'marked#variable/variable';
import { identifier, literal } from '../mock/node';
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

            const result: any = await Evaluator_Expressions.conditionalExpressionEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.equal(10);
        });
    });

    describe('Given an <ForInStatement> evaluator', (): void => {

        it('should get keys one by one', async (): Promise<void> => {

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
                right: identifier('hello'),
                body: {
                    type: 'BlockStatement',
                    body: [],
                },
            };

            sandbox.when('Identifier', (node: EST.Identifier) => new SandMap().set('left', 10));

            await Evaluator_Expressions.forInStatementEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(trace).to.be.lengthOf(1);

            const variable: Variable<any> = scope.children[0].rummage('left') as Variable<any>;
            expect(variable.get()).to.be.equal('left');
        });
    });
});
