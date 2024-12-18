/**
 * @author WMXPY
 * @namespace E2E
 * @description Module Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for Module evaluators', (): void => {

    const chance = new Chance('sandbox-module-evaluators-module');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to import literals from default', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => middle.push(content));
        sandbox.provide('a', { default: testValue });

        const result = await sandbox.evaluate(`import a from 'a';deject(a);`);

        assertSucceedMarkedResult(result);

        expect(middle).toHaveLength(1);
        expect(middle).toEqual([testValue]);
    });

    it('should be able to import literals from declare', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => middle.push(content));
        sandbox.provide('a', { a: testValue });

        const result = await sandbox.evaluate(`import { a } from 'a';deject(a);`);

        assertSucceedMarkedResult(result);

        expect(middle).toHaveLength(1);
        expect(middle).toEqual([testValue]);
    });

    it('should be able to import literals from namespace', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        const testValue: number = chance.integer();
        sandbox.inject('deject', (content: any) => middle.push(content));
        sandbox.provide('a', { a: testValue });

        const result = await sandbox.evaluate(`import * as a from 'a';deject(a.a);`);

        assertSucceedMarkedResult(result);

        expect(middle).toHaveLength(1);
        expect(middle).toEqual([testValue]);
    });

    it('should be able to export default literals', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const testValue: number = chance.integer();
        sandbox.provide('a', { default: testValue });

        const result = await sandbox.evaluate(`import a from 'a';export default a;`);

        assertSucceedMarkedResult(result);

        expect(sandbox.executeScope.exposed.default).toEqual(testValue);
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

        expect(sandbox.executeScope.exposed.default).toEqual(testValue);
    });

    it('should be able to provide array', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const testValue: number = chance.integer();
        sandbox.provide('a', {
            a: [testValue],
        });

        await sandbox.evaluate(`import {a} from 'a';export default a[0];`);

        expect(sandbox.executeScope.exposed.default).toEqual(testValue);
    });
});
