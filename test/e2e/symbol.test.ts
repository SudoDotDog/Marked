/**
 * @author WMXPY
 * @namespace E2E
 * @description Symbol Test
 */

require('../../src/binding');
import { expect } from 'chai';
import * as Chance from 'chance';
import { useEverything } from 'marked#evaluate/evaluate';
import { SandList } from 'marked#variable/sandlist';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Symbol evaluators', (): void => {

    const chance = new Chance('sandbox-symbol-evaluators-module');

    const createSandbox = () => {
        const sandbox: Sandbox = new Sandbox();
        useEverything(sandbox);
        return sandbox;
    };

    describe('Given a for loop to test symbols', (): void => {

        it('break should break for loop', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();
            const loopStart: number = chance.integer({ min: 3, max: 5 });

            const result: any[] = [];
            sandbox.inject('deject', (content: any) => result.push(content));
            sandbox.inject('loop', new SandList([loopStart, loopStart + 1, loopStart + 2]));

            await sandbox.evaluate(`for(const a of loop){deject(a);break;}`);

            expect(result).to.be.lengthOf(1);
            expect(result).to.be.deep.equal([loopStart]);
        });

        it('continue should skip rest of loop', async (): Promise<void> => {

            const sandbox: Sandbox = createSandbox();
            const loopStart: number = chance.integer({ min: 3, max: 5 });

            const result: any[] = [];
            sandbox.inject('deject', (content: any) => result.push(content));
            sandbox.inject('loop', new SandList([loopStart, loopStart + 1, loopStart + 2]));

            await sandbox.evaluate(`for(const a of loop){deject(a);continue;deject(a);}`);

            expect(result).to.be.lengthOf(3);
            expect(result).to.be.deep.equal([loopStart, loopStart + 1, loopStart + 2]);
        });
    });
});
