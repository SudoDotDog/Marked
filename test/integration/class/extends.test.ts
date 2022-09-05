/**
 * @author WMXPY
 * @namespace Class
 * @description Extends
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Extends) Cases', (): void => {

    const chance = new Chance('integration-class-extends');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it.only('should be able to create extends class declaration', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const originName: string = chance.word();
        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class ${originName}{}`,
            `class ${className} extends ${originName}{}`,
            `export const AName = ${originName}.name;`,
            `export const BName = ${className}.name;`,
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.AName).to.be.equal(originName);
        expect(result.exports.named.BName).to.be.equal(className);
    });

    it.only('should be able to get extends super class value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const originName: string = chance.word();
        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class ${originName}{superValue=10;}`,
            `class ${className} extends ${originName}{}`,
            `const b=new ${className}();`,
            `export default b.superValue;`,
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(10);
    });
});
