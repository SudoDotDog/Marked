/**
 * @author WMXPY
 * @namespace Class
 * @description This
 * @override Integration Test
 */

/* eslint-disable max-classes-per-file */
import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../util/assert-result';

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

        expect(result.exports.default).toEqual(value);
    });

    it('should be able to get this property from external class method', async (): Promise<void> => {

        class A {
            public value: string = chance.word();
            public constructor() {
                this.get = this.get.bind(this);
            }
            public get(): string {
                return this.value;
            }
        }
        const a: A = new A();

        const sandbox: Sandbox = createSandbox();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        sandbox.inject('aGet', a.get);

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}";get(){return this.value}};const i=new C();export default aGet();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(a.value);
    });

    it('should be able to get this property from external class method', async (): Promise<void> => {

        class A {
            public value: string = chance.word();
            public get(): string {
                return this.value;
            }
        }
        const a: A = new A();

        const sandbox: Sandbox = createSandbox();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        sandbox.inject('aGet', a.get);

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}";get(){return this.value}};const i=new C();export default aGet();`);

        assertFailedMarkedResult(result);

        expect(typeof result.error.message).toEqual('string');
    });

    it('should be able to get this property from class standalone method', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class C{value="${value}";get(){return this.value}};const i=new C();const f=i.get;export default f();`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(value);
    });
});
