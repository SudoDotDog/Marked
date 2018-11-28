/**
 * @author WMXPY
 * @namespace E2E
 * @description Module Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { useEverything } from '../../src/evaluate/evaluate';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Module evaluators', (): void => {

    const chance = new Chance('sandbox-module-evaluators-module');

    const createSandbox = () => {
        const sandbox: Sandbox = new Sandbox();
        useEverything(sandbox);
        return sandbox;
    };

    it('should be able to import literals from default', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => result.push(content));
        sandbox.provide('a', { default: testValue });

        await sandbox.evaluate(`import a from 'a';deject(a);`);

        expect(result).to.be.lengthOf(1);
        expect(result).to.be.deep.equal([testValue]);
    });

    it('should be able to import literals from declare', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => result.push(content));
        sandbox.provide('a', { a: testValue });

        await sandbox.evaluate(`import { a } from 'a';deject(a);`);

        expect(result).to.be.lengthOf(1);
        expect(result).to.be.deep.equal([testValue]);
    });

    it('should be able to import literals from namespace', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => result.push(content));
        sandbox.provide('a', { a: testValue });

        await sandbox.evaluate(`import * as a from 'a';deject(a.a);`);

        expect(result).to.be.lengthOf(1);
        expect(result).to.be.deep.equal([testValue]);
    });

    it('should be able to export default literals', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const testValue: number = chance.integer();
        sandbox.provide('a', { default: testValue });

        await sandbox.evaluate(`import a from 'a';export default a;`);

        expect(sandbox.exposed.default).to.be.equal(testValue);
    });

    it('should be able to provide objects', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const testValue: number = chance.integer();
        sandbox.provide('a', {
            a: {
                a: testValue,
            },
        });

        await sandbox.evaluate(`import {a} from 'a';export default a.a;`);

        expect(sandbox.exposed.default).to.be.equal(testValue);
    });

    it('should be able to provide array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const testValue: number = chance.integer();
        sandbox.provide('a', {
            a: [testValue],
        });

        await sandbox.evaluate(`import {a} from 'a';export default a[0];`);

        expect(sandbox.exposed.default).to.be.equal(testValue);
    });
});
