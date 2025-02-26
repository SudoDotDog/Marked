/**
 * @author WMXPY
 * @namespace E2E
 * @description Calculate Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Calculate evaluators', (): void => {

    const chance = new Chance('sandbox-module-evaluators-calculate');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle binary operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('number', value);
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(number+1);`);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(value + 1);
    });

    it('should be able to handle logical operation - or', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(true||false);`);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(true);
    });

    it('should be able to handle logical operation - and', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`deject(true&&false);`);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(false);
    });

    describe('Given a complex update expression', (): void => {

        it('should be able handle basic update expression - suffix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a=${value};deject(a++);deject(a);`);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(value);
            expect(result[1]).toEqual(value + 1);
        });

        it('should be able handle basic update expression - prefix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a=${value};deject(++a);deject(a);`);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(value + 1);
            expect(result[1]).toEqual(value + 1);
        });

        it('should be able handle member update expression - suffix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a={a:${value}};deject(a.a++);deject(a.a);`);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(value);
            expect(result[1]).toEqual(value + 1);
        });

        it('should be able handle member update expression - prefix', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();

            const result: any[] = [];
            const value: number = chance.integer({ max: 10, min: 1 });
            sandbox.inject('deject', (content: any) => result.push(content));

            await sandbox.evaluate(`let a={a:${value}};deject(--a.a);deject(a.a);`);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(value - 1);
            expect(result[1]).toEqual(value - 1);
        });
    });
});
