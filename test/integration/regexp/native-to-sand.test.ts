/**
 * @author WMXPY
 * @namespace RegExp
 * @description Native To Sand
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration RegExp (Native To Sand) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-regexp-native-to-sand');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to parse native regexp to sand literal regexp', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('regexp', /test/);

        const result: MarkedResult = await sandbox.evaluate(`export default regexp;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(/test/);
    });

    it('should be able to parse native regexp to sand literal regexp with flags', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('regexp', /test/ig);

        const result: MarkedResult = await sandbox.evaluate(`export default regexp;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(/test/ig);
    });
});
