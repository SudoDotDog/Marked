/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Sequence Statement
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { VARIABLE_TYPE } from '../../../src/declare/variable';
import { sequenceExpressionEvaluator } from '../../../src/evaluate/sequence-expression';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <SequenceStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-sequence-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        const result: any = await executeWithMock(sequenceExpressionEvaluator, testNode);

        expect(result).to.be.equal(10);
        expect(sandbox.count).to.be.equal(2);
        expect(trace).to.be.lengthOf(1);

        const variable: Variable<any> = scope.rummage('hello') as Variable<any>;
        expect(variable.get()).to.be.equal(value);
    });
});
