/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import * as Symbol_Expressions from 'marked#evaluate/symbol';
import { Flag } from 'marked#variable/flag';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

describe('Given Symbol evaluators', (): void => {

    const chance = new Chance('symbol-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <BreakStatement> evaluator', (): void => {

        it('should return a break flag', async (): Promise<void> => {

            const testNode: EST.BreakStatement = {

                type: 'BreakStatement',
            };

            const result: any = await Symbol_Expressions.breakEvaluator.bind(sandbox)(testNode, scope, trace);

            expect(result).to.be.instanceof(Flag);
            // tslint:disable-next-line
            expect(result.isBreak()).to.be.true;
        });
    });
});
