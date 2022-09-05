/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Assignment Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <AssignmentExpression> Cases', (): void => {

    const chance = new Chance('sandbox-assignment-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle assignment expression - member', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const value: number = chance.integer({ min: 3, max: 5 });

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const a={};a.a=${value};deject(a.a)`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(1);
        expect(middle).to.be.deep.equal([value]);
    });

    it('should be able to handle assignment expression - array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list=[1,2];const [a,b]=list;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, 2]);
    });

    it('should be able to handle assignment expression - array but invalid length - short', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list=[1];const [a,b]=list;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle assignment expression - array but invalid length - long', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list=[1,2,3];const [a,b]=list;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, 2]);
    });

    it('should be able to handle assignment expression - array but got object', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list={a:1,b:2};const [a,b]=list;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle assignment expression - array but got literal', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const list=5;const [a,b]=list;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle assignment expression - object', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const map={a:1,b:2};const {a,b}=map;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, 2]);
    });

    it('should be able to handle assignment expression - object but invalid property - missing', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const map={a:1};const {a,b}=map;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, undefined]);
    });

    it('should be able to handle assignment expression - object but invalid property - extra', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const map={a:1,b:2,c:3};const {a,b}=map;deject(a);deject(b);`);

        assertSucceedMarkedResult(result);

        expect(middle).to.be.lengthOf(2);
        expect(middle).to.be.deep.equal([1, 2]);
    });

    it('should be able to handle assignment expression - object but got class', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`class A{a=1;b=2}const clazz=new A();const {a,b}=clazz;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle assignment expression - object but got list', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const map=[1,2];const {a,b}=map;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle assignment expression - object but got literal', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        const result = await sandbox.evaluate(`const map="Tests";const {a,b}=map;deject(a);deject(b);`);

        assertFailedMarkedResult(result);
    });
});
