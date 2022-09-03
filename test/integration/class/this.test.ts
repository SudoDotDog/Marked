/**
 * @author WMXPY
 * @namespace Class
 * @description This
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (This) Cases', (): void => {

    const chance = new Chance('integration-class-this');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to get this property from class', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}";get(){return this.value}};const i=new C();export default i.get();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(value);
    });
});
