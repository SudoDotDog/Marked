/**
 * @author WMXPY
 * @namespace E2E
 * @description Variable Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { useEverything } from '../../src/evaluate/evaluate';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for Variable evaluators', (): void => {

    const chance = new Chance('sandbox-variable-evaluators-module');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);
        return sandbox;
    };

    it('should be able to handle assignment expression - member', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const value: number = chance.integer({ min: 3, max: 5 });

        const result: any[] = [];
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`const a={};a.a=${value};deject(a.a)`);
        expect(result).to.be.lengthOf(1);
        expect(result).to.be.deep.equal([value]);
    });
});
