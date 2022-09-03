/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Spread Element
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <SpreadElement> Cases', (): void => {

    const chance = new Chance('sandbox-spread-element');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it.only('should be able to handle array init with single spread element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const origin=[${value}];export default [...origin];`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(1);
        expect(middle[0]).to.be.equal([value]);
    });
});
