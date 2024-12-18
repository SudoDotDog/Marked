/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Declaration
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { functionDeclarationEvaluator } from '../../../src/evaluate/function-declaration';
import { SandFunction } from '../../../src/variable/sand-function/sand-function';
import { createIdentifier } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <FunctionDeclaration> Evaluators', (): void => {

    const chance = new Chance('evaluate-function-declaration');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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
            .forEach((element: EST.Statement) => {
                sandbox.execute(element, scope, trace);
            }));

        const result: any = await executeWithMock(functionDeclarationEvaluator, testNode);

        expect(result).toBeInstanceOf(SandFunction);
    });
});
