/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ScriptLocation } from '../../../src/declare/script-location';
import * as Evaluator_Expressions from '../../../src/evaluate/expression';
import { Sandbox } from '../../../src/marked/sandbox';
import { RawSourceMapLocationFinder } from '../../../src/source-map/location-finder/raw';
import { Flag } from '../../../src/variable/flag';
import { Scope } from '../../../src/variable/scope';
import { Trace } from '../../../src/variable/trace/trace';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';

describe('Given Expression evaluators', (): void => {

    const chance = new Chance('expression-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <SwitchStatement> and <SwitchCase> evaluator', (): void => {

        it('should be able to handle switch cases', async (): Promise<void> => {

            const discriminant: number = chance.integer({ min: 1, max: 3 });

            const result: any[] = [];
            const testNode: EST.SwitchStatement = {

                type: 'SwitchStatement',
                discriminant: createLiteral(discriminant),
                cases: [1, 2, 3].map((value: number): EST.SwitchCase => ({
                    type: 'SwitchCase',
                    test: createLiteral(value),
                    consequent: [{
                        type: 'MockStatement',
                        value,
                    } as any, {
                        type: 'BreakStatement',
                    }],
                })),
            };

            sandbox.when('Identifier', (node: EST.Identifier) => node.name);
            sandbox.when('Literal', mockLLiteralEvaluator);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sandbox.when('BreakStatement', (node: EST.BreakStatement) => Flag.fromBreak(
                Trace.init(
                    ScriptLocation.createRoot(),
                    RawSourceMapLocationFinder.fromEmpty(),
                ),
            ));

            sandbox.when('SwitchCase', Evaluator_Expressions.switchCaseEvaluator);
            sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

            await Evaluator_Expressions.switchExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.deep.equal([discriminant]);
        });
    });
});
