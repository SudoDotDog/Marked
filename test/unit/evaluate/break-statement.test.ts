/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Break Statement
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { breakStatementEvaluator } from '../../../src/evaluate/break-statement';
import { Flag } from '../../../src/variable/flag';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <BreakStatement> Evaluators', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('evaluate-break-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('should return a break flag', async (): Promise<void> => {

        const testNode: EST.BreakStatement = {

            type: 'BreakStatement',
        };

        const result: any = await executeWithMock(breakStatementEvaluator, testNode);

        expect(result).to.be.instanceof(Flag);
        expect(result.isBreak()).to.be.true;
    });
});
