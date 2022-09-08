/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Export Default Declaration
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { exportDefaultDeclarationEvaluator } from '../../../src/evaluate/export-default-declaration';
import { createLiteral, mockLLiteralEvaluator } from '../../mock/node';
import { MockSandbox } from '../../mock/sandbox';
import { MockScope } from '../../mock/scope';
import { MockTrace } from '../../mock/trace';
import { createExecuteWithMock } from '../../util/execute-with-mock';

describe('Given <ExportDefaultDeclaration> Evaluators', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('evaluate-export-default-declaration');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it('should return literal if is valid', async (): Promise<void> => {
        const testValue: number = chance.integer();
        const testNode: EST.ExportDefaultDeclaration = {

            type: 'ExportDefaultDeclaration',
            declaration: createLiteral(testValue),
        };

        sandbox.when('Literal', mockLLiteralEvaluator);

        const result: any = await executeWithMock(exportDefaultDeclarationEvaluator, testNode);

        expect(result).to.be.undefined;
        expect(scope.exposed.default).to.be.equal(testValue);
    });
});
