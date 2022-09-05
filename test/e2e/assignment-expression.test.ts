/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Assignment Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe.only('Given Sandbox for <AssignmentExpression> Cases', (): void => {

    const chance = new Chance('sandbox-assignment-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle assignment expression - member', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const value: number = chance.integer({ min: 3, max: 5 });

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const a={};a.a=${value};deject(a.a)`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(1);
        expect(middle).to.be.deep.equal([value]);
    });

    it('should be able to handle assignment expression - array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list=[1,2];const [a,b]=list;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, 2]);
    });
});
