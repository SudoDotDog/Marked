/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Module Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import * as Module_Expressions from 'marked#evaluate/module';
import { createLiteral, mockLLiteralEvaluator } from '../mock/node';
import { MockSandbox } from '../mock/sandbox';
import { MockScope } from '../mock/scope';
import { MockTrace } from '../mock/trace';

describe('Given Module evaluators', (): void => {

    const chance = new Chance('module-evaluators');

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    beforeEach((): void => {
        sandbox.reset();
        scope.reset();
        trace.reset();
    });

    describe('Given an <ExportDefaultDeclaration> evaluator', (): void => {

        it('should return literal if is valid', async (): Promise<void> => {
            const testValue: number = chance.integer();
            const testNode: EST.ExportDefaultDeclaration = {

                type: 'ExportDefaultDeclaration',
                declaration: createLiteral(testValue),
            };

            sandbox.when('Literal', mockLLiteralEvaluator);

            const result: any = await Module_Expressions.exportsDefaultDeclarationEvaluator.bind(sandbox)(testNode, scope, trace);

            // tslint:disable-next-line
            expect(result).to.be.undefined;
            expect(sandbox.exposed.default).to.be.equal(testValue);
        });
    });
});
