/**
 * @author WMXPY
 * @namespace InjectClass
 * @description Native Class
 * @override Integration Test
 */

/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedNativeClass, MarkedNativeClassInstance, MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Inject Class (Native Class) Cases', (): void => {

    const chance = new Chance('integration-inject-class-native-class');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to inject native class with export', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const memberResult: string = chance.string();
        const nativeResult: string = chance.string();

        class TestClass extends MarkedNativeClassInstance {

            public getMember() {
                return memberResult;
            }
            public toNative() {
                return nativeResult;
            }
        }

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create(() => {
            return new TestClass();
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `const clazz = new Clazz();`,
            `export const member = clazz.test;`,
            `export const native = clazz;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.member).to.be.equal(memberResult);
        expect(result.exports.named.native).to.be.equal(nativeResult);
    });

    it('should be able to inject native class with static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const staticResult: string = chance.string();

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create(() => {
            return null as any;
        }, {
            test: staticResult,
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `export default Clazz.test;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(staticResult);
    });

    it('should be able to inject native class with static method', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const staticResult: string = chance.string();

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create(() => {
            return null as any;
        }, {
            test: () => staticResult,
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `export default Clazz.test();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(staticResult);
    });

    it('should be able to inject native class with constructor value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const memberResult: string = chance.string();
        const nativeResult: string = chance.string();

        class TestClass extends MarkedNativeClassInstance {

            private readonly _value: string;

            public constructor(value: string) {
                super();
                this._value = value;
            }

            public getMember() {
                return memberResult;
            }
            public toNative() {
                return this._value;
            }
        }

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create((...args: any[]) => {
            return new TestClass(args[0]);
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `const clazz = new Clazz("${nativeResult}");`,
            `export const member = clazz.test;`,
            `export const native = clazz;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.member).to.be.equal(memberResult);
        expect(result.exports.named.native).to.be.equal(nativeResult);
    });

    it('should be able to inject native class with constructor with map and array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const value1Result: string = chance.string();
        const value2Result: string = chance.string();
        const nativeResult: string = chance.string();

        class TestClass extends MarkedNativeClassInstance {

            private readonly _value1: any;
            private readonly _value2: any;

            public constructor(value1: any, value2: any) {
                super();
                this._value1 = value1;
                this._value2 = value2;
            }

            public getMember(name: string) {
                if (name === 'value1') {
                    return this._value1;
                }
                if (name === 'value2') {
                    return this._value2;
                }
                return null;
            }
            public toNative() {
                return nativeResult;
            }
        }

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create((...args: any[]) => {
            return new TestClass(args[0], args[1]);
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `const clazz = new Clazz(["${value1Result}"], {test: "${value2Result}"});`,
            `export const value1 = clazz.value1;`,
            `export const value2 = clazz.value2;`,
            `export const native = clazz;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.value1).to.be.deep.equal([value1Result]);
        expect(result.exports.named.value2).to.be.deep.equal({ test: value2Result });
        expect(result.exports.named.native).to.be.equal(nativeResult);
    });

    it('should be able to inject native class with export mapped member function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const memberResult: string = chance.string();
        const nativeResult: string = chance.string();

        class TestClass extends MarkedNativeClassInstance {

            public getMember() {
                return {
                    test: memberResult,
                };
            }
            public toNative() {
                return nativeResult;
            }
        }

        const nativeClass: MarkedNativeClass = MarkedNativeClass.create(() => {
            return new TestClass();
        });

        sandbox.inject('Clazz', nativeClass);

        const result: MarkedResult = await sandbox.evaluate([
            `const clazz = new Clazz();`,
            `export const member = clazz.test;`,
            `export const native = clazz;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.named.member).to.be.deep.equal({
            test: memberResult,
        });
        expect(result.exports.named.native).to.be.equal(nativeResult);
    });
});
