/**
 * @author WMXPY
 * @namespace StaticInitialization
 * @description Simple
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Static Initialization (Simple) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-static-initialization-simple');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute in static block for initialization', async (): Promise<void> => {

        const injectExecutes: string[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: string) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static {`,
            `execute('A');`,
            `execute('B');`,
            `}`,
            `}`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal(['A', 'B']);
    });

    it('should be able to execute as class declaration', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `let a = 10;`,
            `execute(a);`,
            `class A {`,
            `static {`,
            `a = 0;`,
            `}`,
            `}`,
            `execute(a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([10, 0]);
    });

    it('should be able to execute in variable declaration and update within static block', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `let a = 10;`,
            `let b = 10;`,
            `class A {`,
            `static {`,
            `a = 0;`,
            `let b = 0;`,
            `}`,
            `}`,
            `execute(a);`,
            `execute(b);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([0, 10]);
    });

    it('should be able to set static variable', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static a = 10;`,
            `static {`,
            `this.a = 0;`,
            `}`,
            `}`,
            `execute(A.a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([0]);
    });

    it('should be able to set static variable with self call', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static a = 10;`,
            `static {`,
            `A.a = 0;`,
            `}`,
            `}`,
            `execute(A.a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([0]);
    });

    it('should be able to set static variable in body with self call', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static a = 10;`,
            `static b = this.a + 10;`,
            `static c = A.b + 10;`,
            `}`,
            `execute(A.a);`,
            `execute(A.b);`,
            `execute(A.c);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(injectExecutes).to.be.deep.equal([10, 20, 30]);
    });

    it('should be able to set static variable double blocks', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static a = 0;`,
            `static {`,
            `this.a = 5;`,
            `}`,
            `static {`,
            `this.a = 10;`,
            `}`,
            `}`,
            `execute(A.a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([10]);
    });

    it('should be able to set static variable reverse orders', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static {`,
            `this.a = 0;`,
            `}`,
            `static a = 10;`,
            `}`,
            `execute(A.a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([10]);
    });

    it('should be able to set static variable non-declaration', async (): Promise<void> => {

        const injectExecutes: number[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: number) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static {`,
            `this.a = 0;`,
            `}`,
            `}`,
            `execute(A.a);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal([0]);
    });
});
