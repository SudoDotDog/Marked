/**
 * @author WMXPY
 * @namespace Evaluate
 * @description If Statement
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { ifStatementEvaluator } from '../../../src/evaluate/if-statement';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <IfStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-if-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        await executeWithMock(ifStatementEvaluator, testNode);

        expect(result).toEqual([value]);
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

        await executeWithMock(ifStatementEvaluator, testNode);

        expect(result).toEqual([sadValue]);
    });
});
