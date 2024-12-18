/**
 * @author WMXPY
 * @namespace Class
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
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

        expect(result.exports.default).toEqual(className);
    });

    it('should be able to get typeof class declaration', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`class A{};export default typeof A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('class');
    });

    it('should be able to get typeof class instance', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate(`class A{};const a=new A();export default typeof a;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual('class-instance');
    });

    it('should be able to create a class variable', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}"};const i=new C();export default i.value;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(value);
    });

    it('should be able to create a class function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value(){return "${value}";}};const i=new C();export default i.value();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(value);
    });

    it('should be able to call mutate variable method', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class C {`,
            `value = 0;`,
            `addValue(){`,
            `this.value++;`,
            `}`,
            `getValue(){`,
            `return this.value;`,
            `}`,
            `}`,
            `const i = new C();`,
            `i.addValue();`,
            `export const valueResult = i.value;`,
            `export const getValueResult = i.getValue();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.valueResult).toEqual(1);
        expect(result.exports.named.getValueResult).toEqual(1);
    });

    it('should be able to call mutate variable method with nested map', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class C {`,
            `value = {a: {b: 0}};`,
            `addValue(){`,
            `this.value.a.b++;`,
            `}`,
            `getValue(){`,
            `return this.value.a.b;`,
            `}`,
            `}`,
            `const i = new C();`,
            `i.addValue();`,
            `export const valueResult = i.value.a.b;`,
            `export const getValueResult = i.getValue();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.valueResult).toEqual(1);
        expect(result.exports.named.getValueResult).toEqual(1);
    });
});
