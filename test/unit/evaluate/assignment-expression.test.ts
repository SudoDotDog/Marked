/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Assignment Expression
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { ERROR_CODE } from '../../../src/declare/error-code';
import { VARIABLE_TYPE } from '../../../src/declare/variable';
import { assignmentExpressionEvaluator } from '../../../src/evaluate/assignment-expression';
import { error } from '../../../src/util/error/error';
import { SandMap } from '../../../src/variable/sand-map';
import { Variable } from '../../../src/variable/variable';
import { createIdentifier, createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <AssignmentExpression> Evaluators', (): void => {

    const chance = new Chance('evaluate-arrow-function-expression');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

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

        await executeWithMock(assignmentExpressionEvaluator, testNode);

        const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
        expect(variable.get()).to.be.equal(value);
    });

    it('should be able to assign member', async (): Promise<void> => {

        const variableName: string = chance.string();
        const objectName: string = chance.string();
        const value: number = chance.integer({ min: 10, max: 50 });

        scope.register(VARIABLE_TYPE.SCOPED)(variableName, SandMap.fromRawRecord<number>({
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

        const result = await executeWithMock(assignmentExpressionEvaluator, testNode);

        expect(result).to.be.equal(value);

        const variable: Variable<any> = scope.rummage(variableName) as Variable<any>;
        expect((variable as Variable<SandMap<number>>).get().get(objectName)).to.be.equal(value + value);
    });
});
