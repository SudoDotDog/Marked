/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Binary Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <BinaryExpression> Cases', (): void => {

    const chance = new Chance('sandbox-binary-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle divide by zero', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const value: number = chance.integer({ min: 3, max: 5 });

        const result = await sandbox.evaluate(`export default ${value} / 0`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle in map operation - happy path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const map={a:1};export default a in map;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to handle in map operation - sad path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const map={a:1};export default b in map;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.false;
    });

    it('should be able to handle in class operation - happy path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{static a=10};export default a in A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to handle in class operation - sad path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{a=10};export default b in A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.false;
    });

    it('should be able to handle in class instance operation - happy path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{a=10};const a=new A();export default a in a;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to handle in class instance operation - sad path', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{a=10};const a=new A();export default b in a;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.false;
    });

    it('should be able to handle in list operation - error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`const list=[];export default a in list;`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle instance of operation - 1 layer', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{}const a=new A();export default a instanceof A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to handle instance of operation - 2 layers', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{}class B extends A{}const a=new B();export default a instanceof A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to handle instance of operation - class not same', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{}class B{}const a=new A();export default a instanceof B;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.false;
    });

    it('should be able to handle instance of operation - invalid left', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{}const a={};export default a instanceof A;`);

        assertFailedMarkedResult(result);
    });

    it('should be able to handle instance of operation - invalid right', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate(`class A{}const a=new A();export default a instanceof {};`);

        assertFailedMarkedResult(result);
    });
});
