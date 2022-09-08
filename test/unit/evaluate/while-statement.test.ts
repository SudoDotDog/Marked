/**
 * @author WMXPY
 * @namespace Evaluate
 * @description While Statement
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { whileStatementEvaluator } from '../../../src/evaluate/while-statement';
import { getBinaryOperation } from '../../../src/operation/binary-expression/operators';
import { createIdentifier, createLiteral } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <WhileStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-while-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        await executeWithMock(whileStatementEvaluator, testNode);

        expect(sandbox.count).to.be.equal(16);
        expect(result).to.be.lengthOf(5);
    });
});
