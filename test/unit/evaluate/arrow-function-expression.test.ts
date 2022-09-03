/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Arrow Function Expression
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { arrowFunctionExpressionEvaluator } from '../../../src/evaluate/arrow-function-expression';
import { SandFunction } from '../../../src/variable/sand-function/sand-function';
import { createIdentifier } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ArrowFunctionExpression> Evaluators', (): void => {

    const chance = new Chance('evaluate-arrow-function-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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
            .forEach((element: EST.Statement) => {
                sandbox.execute(element, scope, trace);
            }));

        sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

        const func: any = await executeWithMock(arrowFunctionExpressionEvaluator, testNode);

        expect(func).to.be.instanceof(SandFunction);

        func.function(argument);
        expect(result).to.be.deep.equal([value]);

        const mockedChildScope: MockScope = scope.children[0];
        expect((mockedChildScope.constants.get(param) as any).get()).to.be.equal(argument);
    });
});
