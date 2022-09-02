/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Unary Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for <UnaryExpression> Cases', (): void => {

    const chance = new Chance('sandbox-unary-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle reverse operation - boolean', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: boolean = chance.bool();
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(!${value.toString()});`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(!value);
    });

    it('should be able to handle typeof operation - string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: string = chance.string();
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof "${value}");`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('string');
    });

    it('should be able to handle typeof operation - function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: string = chance.string();
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof (() => "${value}"));`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('function');
    });

    it('should be able to handle typeof operation - object', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: string = chance.string();
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof {key: "${value}"});`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('object');
    });

    it('should be able to handle typeof operation - list', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: string = chance.string();
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof ["${value}"]);`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('array');
    });

    it('should be able to handle typeof operation - null', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof null);`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('null');
    });

    it('should be able to handle typeof operation - undefined', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(typeof undefined);`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal('undefined');
    });
});
