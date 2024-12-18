/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Expression
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { functionExpressionEvaluator } from '../../../src/evaluate/function-expression';
import { SandFunction } from '../../../src/variable/sand-function/sand-function';
import { createIdentifier } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <FunctionExpression> Evaluators', (): void => {

    const chance = new Chance('evaluate-function-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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
            .forEach((element: EST.Statement) => {
                sandbox.execute(element, scope, trace);
            }));
        sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

        const func: SandFunction = await executeWithMock(functionExpressionEvaluator, testNode);

        expect(func).toBeInstanceOf(SandFunction);

        func.execute(argument);
        expect(result).toEqual([value]);

        const mockedChildScope: MockScope = scope.children[0];
        expect((mockedChildScope.constantMap.get(param) as any).get()).toEqual(argument);
    });
});
