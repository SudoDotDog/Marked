/**
 * @author WMXPY
 * @namespace E2E
 * @description Calculate Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import { useEverything } from 'marked#evaluate/evaluate';
import { SandList } from 'marked#variable/sandlist';
import { SandMap } from 'marked#variable/sandmap';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Calculate evaluators', (): void => {

    const chance = new Chance('sandbox-module-evaluators-calculate');

    const createSandbox = () => {
        const sandbox: Sandbox = new Sandbox();
        useEverything(sandbox);
        return sandbox;
    };

    it('should be able to handle binary operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(number+1);`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(value + 1);
    });

    describe('Given a complex update expression', (): void => {

        it('should be able handle basic update expression - suffix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a=${value};deject(a++);deject(a);`);

            expect(result).to.be.lengthOf(2);
            expect(result[0]).to.be.equal(value);
            expect(result[1]).to.be.equal(value + 1);
        });

        it('should be able handle basic update expression - prefix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a=${value};deject(++a);deject(a);`);

            expect(result).to.be.lengthOf(2);
            expect(result[0]).to.be.equal(value + 1);
            expect(result[1]).to.be.equal(value + 1);
        });

        it('should be able handle member update expression - suffix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a={a:${value}};deject(a.a++);deject(a.a);`);

            expect(result).to.be.lengthOf(2);
            expect(result[0]).to.be.equal(value);
            expect(result[1]).to.be.equal(value + 1);
        });

        it('should be able handle member update expression - prefix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a={a:${value}};deject(--a.a);deject(a.a);`);

            expect(result).to.be.lengthOf(2);
            expect(result[0]).to.be.equal(value - 1);
            expect(result[1]).to.be.equal(value - 1);
        });
    });
});
