/**
 * @author WMXPY
 * @namespace Evaluate
 * @description For In Statement
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { forInStatementEvaluator } from '../../../src/evaluate/for-in-statement';
import { SandMap } from '../../../src/variable/sand-map';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ForInStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-for-in-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        sandbox.when('Identifier', (_: EST.Identifier) => SandMap.fromScratch().set(value, undefined));

        await executeWithMock(forInStatementEvaluator, testNode);

        expect(sandbox.count).toEqual(2);

        const variable: Variable<any> = scope.children[0].rummage('left') as Variable<any>;
        expect(variable.get()).toEqual(value);
    });
});
