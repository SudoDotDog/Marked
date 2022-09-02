/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Template Literal
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <TemplateLiteral> Cases', (): void => {

    const chance = new Chance('sandbox-template-literal');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle template literal - centered variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);

        const result = await sandbox.evaluate("export default `first${number}second`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`first${value}second`);
    });

    it('should be able to handle template literal - front variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);

        const result = await sandbox.evaluate("export default `${number}second`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`${value}second`);
    });

    it('should be able to handle template literal - end variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);

        const result = await sandbox.evaluate("export default `first${number}`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`first${value}`);
    });

    it('should be able to handle template literal - single variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);

        const result = await sandbox.evaluate("export default `${number}`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`${value}`);
    });

    it('should be able to handle template literal - null', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.inject('number', null);

        const result = await sandbox.evaluate("export default `first${number}second`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`first${null}second`);
    });

    it('should be able to handle template literal - undefined', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.inject('number', undefined);

        const result = await sandbox.evaluate("export default `first${number}second`");

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(`first${undefined}second`);
    });
});
