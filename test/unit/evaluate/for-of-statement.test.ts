/**
 * @author WMXPY
 * @namespace Evaluate
 * @description For Of Statement
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { forOfStatementEvaluator } from '../../../src/evaluate/for-of-statement';
import { SandList } from '../../../src/variable/sand-list';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ForOfStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-for-in-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        sandbox.when('Identifier', (_: EST.Identifier) => SandList.create([1, 2, 3, 4, 5]));

        await executeWithMock(forOfStatementEvaluator, testNode);

        expect(sandbox.count).to.be.equal(6);
        expect(scope.children).to.be.lengthOf(5);
        scope.children.forEach((child: MockScope, index: number) =>
            expect((child.rummage('left') as Variable<number>).get()).to.be.equal(index + 1));
    });
});
