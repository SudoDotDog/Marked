/**
 * @author WMXPY
 * @namespace StaticInitialization
 * @description Simple
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Static Initialization (Simple) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-inject-class-date');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it.only('should be able to execute in static block for initialization', async (): Promise<void> => {

        const injectExecutes: string[] = [];

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('execute', (value: string) => {
            injectExecutes.push(value);
        });

        const result: MarkedResult = await sandbox.evaluate([
            `class A {`,
            `static {`,
            `execute('A');`,
            `}`,
            `}`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(injectExecutes).to.be.deep.equal(['A']);
    });
});
