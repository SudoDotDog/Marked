/**
 * @author WMXPY
 * @namespace Class
 * @description Static Set
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Static Set) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-class-static-set');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it('should be able to set and get static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test {`,
            `static a=1;`,
            `}`,
            `Test.a = 2;`,
            `export default Test.a;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(2);
    });

    it('should be able to update and get static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test {`,
            `static a=1;`,
            `}`,
            `Test.a++;`,
            `export default Test.a;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(2);
    });

    it.only('should be able to set and get static value via method', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test {`,
            `static a=1;`,
            `static setA(value: number) {`,
            `this.a = value;`,
            `}`,
            `}`,
            `Test.setA(2);`,
            `export default Test.a;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(2);
    });
});
