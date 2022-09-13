/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Cycle
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe.only('Given Integration Cross File (Cycle) Cases', (): void => {

    const chance = new Chance('integration-cross-file-cycle');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to reference cycle import value', async (): Promise<void> => {

        const aValue: number = chance.integer({ min: 0, max: 100 });
        const bValue: number = chance.integer({ min: 0, max: 100 });

        const sandbox: Sandbox = createSandbox();

        const middle: any[] = [];
        sandbox.inject('deject', (content: any) => middle.push(content));

        sandbox.resolver((source: string) => {

            if (source === 'a') {
                return {
                    script: [
                        `import {b} from 'b';`,
                        `export const a = ${aValue};`,
                        `export const logB = () => {`,
                        `deject(b);`,
                        `};`,
                    ].join(New_Line_Character),
                    scriptLocation: ScriptLocation.create('mock', 'a'),
                };
            } else {
                return {
                    script: [
                        `import {a} from 'a';`,
                        `export const b = ${bValue};`,
                        `export const logA = () => {`,
                        `deject(a);`,
                        `};`,
                    ].join(New_Line_Character),
                    scriptLocation: ScriptLocation.create('mock', 'b'),
                };
            }
        });

        const result: MarkedResult = await sandbox.evaluate([
            `import {a, logA} from 'a';`,
            `import {b, logB} from 'b';`,
            `logA();`,
            `logB();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(middle).to.be.deep.equal([aValue, bValue]);
    });
});
