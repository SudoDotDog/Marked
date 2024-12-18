/**
 * @author WMXPY
 * @namespace E2E
 * @description Symbol Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Symbol evaluators', (): void => {

    const chance = new Chance('sandbox-symbol-evaluators-module');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    describe('Given a for loop to test symbols', (): void => {

        it('break should break for loop', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();
            const loopStart: number = chance.integer({ min: 3, max: 5 });

            const result: any[] = [];
            sandbox.inject('deject', (content: any) => result.push(content));
            sandbox.inject('loop', [loopStart, loopStart + 1, loopStart + 2]);

            await sandbox.evaluate(`for(const a of loop){deject(a);break;}`);
            expect(result).toHaveLength(1);
            expect(result).toEqual([loopStart]);
        });

        it('continue should skip rest of loop', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();
            const loopStart: number = chance.integer({ min: 3, max: 5 });

            const result: any[] = [];
            sandbox.inject('deject', (content: any) => result.push(content));
            sandbox.inject('loop', [loopStart, loopStart + 1, loopStart + 2]);

            await sandbox.evaluate(`for(const a of loop){deject(a);continue;deject(a);}`);
            expect(result).toHaveLength(3);
            expect(result).toEqual([loopStart, loopStart + 1, loopStart + 2]);
        });

        it('return should break loop and return value', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();
            const loopStart: number = chance.integer({ min: 3, max: 5 });

            const result: any[] = [];
            sandbox.inject('deject', (content: any) => result.push(content));
            sandbox.inject('loop', [loopStart, loopStart + 1, loopStart + 2]);

            await sandbox.evaluate(`export default (() => {for(const a of loop){deject(a);return a;}})()`);

            expect(result).toHaveLength(1);
            expect(result).toEqual([loopStart]);
            expect(sandbox.executeScope.exposed.default).toEqual(loopStart);
        });
    });
});
