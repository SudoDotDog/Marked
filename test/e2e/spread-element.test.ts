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

    it('should be able to handle array init with single spread element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        const result = await sandbox.evaluate(`const origin=[${value}];export default [...origin];`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([value]);
    });

    it('should be able to handle array init with multiple spread element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value1: number = chance.integer({ max: 10, min: 1 });
        const value2: number = chance.integer({ max: 10, min: 1 });
        const value3: number = chance.integer({ max: 10, min: 1 });
        const result = await sandbox.evaluate(`const origin=[${value1}, ${value2}, ${value3}];export default [...origin];`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([value1, value2, value3]);
    });

    it('should be able to handle array init with single spread element - injected list', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('list', [value]);

        const result = await sandbox.evaluate(`export default [...list];`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal([value]);
    });

    it.only('should be able to handle object init with single spread element', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const key: string = chance.word();
        const value: number = chance.integer({ max: 10, min: 1 });
        const result = await sandbox.evaluate(`const origin={${key}: ${value}};export default {...origin};`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal({
            [key]: value,
        });
    });
});
