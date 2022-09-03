/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ERROR_CODE } from '../../../src/declare/error-code';
import { VARIABLE_TYPE } from '../../../src/declare/variable';
import * as Variable_Expressions from '../../../src/evaluate/variable';
import { Sandbox } from '../../../src/marked/sandbox';
import { error } from '../../../src/util/error/error';
import { SandMap } from '../../../src/variable/sand-map';
import { Scope } from '../../../src/variable/scope';
import { Trace } from '../../../src/variable/trace/trace';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';

describe('Given Variable evaluators', (): void => {

    const chance = new Chance('variable-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <AssignmentExpression> evaluator', (): void => {

        it('should be able to assign variable', async (): Promise<void> => {

            const variableName: string = chance.string();
            const value: number = chance.integer();

            scope.register(VARIABLE_TYPE.SCOPED)(variableName, undefined);
            const testNode: EST.AssignmentExpression = {

                type: 'AssignmentExpression',
                operator: '=',
                left: createIdentifier(variableName),
                right: createLiteral(value),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            await Variable_Expressions.assignmentExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
            expect(variable.get()).to.be.equal(value);
        });

        it('should be able to assign member', async (): Promise<void> => {

            const variableName: string = chance.string();
            const objectName: string = chance.string();
            const value: number = chance.integer({ min: 10, max: 50 });

            scope.register(VARIABLE_TYPE.SCOPED)(variableName, new SandMap<number>({
                [objectName]: value,
            }));
            const testNode: EST.AssignmentExpression = {

                type: 'AssignmentExpression',
                operator: '+=',
                left: {
                    type: 'MemberExpression',
                    object: createIdentifier(variableName),
                    property: createIdentifier(objectName),
                    optional: false,
                    computed: false,
                },
                right: createLiteral(value),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);
            sandbox.when('Identifier', (node: EST.Identifier) => {

                const rummaged: Variable<any> | null = scope.rummage(node.name);
                if (rummaged) { return rummaged.get(); }
                throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.name);
            });

            const result = await Variable_Expressions.assignmentExpressionEvaluator
                .bind(sandbox as any as Sandbox)(testNode, scope as any as Scope, trace as any as Trace);

            expect(result).to.be.equal(value);

            const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
            expect((variable as Variable<SandMap<number>>).get().get(objectName)).to.be.equal(value + value);
        });
    });
});
