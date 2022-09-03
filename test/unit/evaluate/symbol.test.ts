/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import * as Symbol_Expressions from '../../../src/evaluate/symbol';
import { Sandbox } from '../../../src/marked/sandbox';
import { Flag } from '../../../src/variable/flag';
import { Scope } from '../../../src/variable/scope';
import { Trace } from '../../../src/variable/trace/trace';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';

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

            const result: any = await Symbol_Expressions.breakEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.instanceof(Flag);
            expect(result.isBreak()).to.be.true;
        });
    });

    describe('Given an <ContinueStatement> evaluator', (): void => {

        it('should return a continue flag', async (): Promise<void> => {

            const testNode: EST.ContinueStatement = {

                type: 'ContinueStatement',
            };

            const result: Flag = await Symbol_Expressions.continueEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.instanceof(Flag);
            expect(result.isContinue()).to.be.true;
        });
    });

    describe('Given an <ReturnStatement> evaluator', (): void => {

        it('should return a return flag', async (): Promise<void> => {

            const testNode: EST.ReturnStatement = {

                type: 'ReturnStatement',
            };

            const result: Flag = await Symbol_Expressions.returnEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.instanceof(Flag);
            expect(result.isReturn()).to.be.true;
        });

        it('should be able to contain value with return flag', async (): Promise<void> => {

            const payload: string = chance.string();

            const testNode: EST.ReturnStatement = {

                type: 'ReturnStatement',
                argument: createLiteral(payload),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            const result: Flag = await Symbol_Expressions.returnEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.instanceof(Flag);
            expect(result.isReturn()).to.be.true;
            expect(result.getValue()).to.be.equal(payload);
        });
    });
});
