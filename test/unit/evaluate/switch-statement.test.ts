/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Switch Statement
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ScriptLocation } from '../../../src/declare/script-location';
import { switchCaseEvaluator } from '../../../src/evaluate/switch-case';
import { switchStatementEvaluator } from '../../../src/evaluate/switch-statement';
import { RawSourceMapLocationFinder } from '../../../src/source-map/location-finder/raw';
import { Flag } from '../../../src/variable/flag';
import { Trace } from '../../../src/variable/trace/trace';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <SwitchStatement> Evaluators', (): void => {

    const chance = new Chance('evaluate-switch-statement');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        sandbox.when('SwitchCase', switchCaseEvaluator);
        sandbox.when('MockStatement' as any, (node: any) => result.push(node.value));

        await executeWithMock(switchStatementEvaluator, testNode);

        expect(result).to.be.deep.equal([discriminant]);
    });
});
