/**
 * @author WMXPY
 * @namespace Class
 * @description Extends
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Extends) Cases', (): void => {

    const chance = new Chance('integration-class-extends');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create extends class declaration', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const originName: string = chance.word();
        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class ${originName}{}`,
            `class ${className} extends ${originName}{}`,
            `export const AName = ${originName}.name;`,
            `export const BName = ${className}.name;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.AName).toEqual(originName);
        expect(result.exports.named.BName).toEqual(className);
    });

    it('should be able to get extends super class value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const originName: string = chance.word();
        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class ${originName}{superValue=10;}`,
            `class ${className} extends ${originName}{}`,
            `const b=new ${className}();`,
            `export default b.superValue;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(10);
    });

    it('should be able to get nested extends super class value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class A{superValue=10;}`,
            `class B extends A{}`,
            `class C extends B{}`,
            `const c=new C();`,
            `export default c.superValue;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(10);
    });

    it('should be able to override extends super class value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const originName: string = chance.word();
        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class ${originName}{superValue=10;}`,
            `class ${className} extends ${originName}{superValue=20;}`,
            `const a=new ${originName}();`,
            `const b=new ${className}();`,
            `export const AValue = a.superValue;`,
            `export const BValue = b.superValue;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.AValue).toEqual(10);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.exports.named.BValue).toEqual(20);
    });
});
