/**
 * @author WMXPY
 * @namespace Class
 * @description Simple
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Simple) Cases', (): void => {

    const chance = new Chance('integration-class-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create a class declaration', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class ${className}{};export default ${className}.name;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(className);
    });

    it('should be able to create a class variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}"};const i=new C();export default i.value;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(value);
    });

    it('should be able to create a class function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value(){return "${value}";}};const i=new C();export default i.value();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(value);
    });
});
