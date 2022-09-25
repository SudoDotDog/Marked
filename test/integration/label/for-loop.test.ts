/**
 * @author WMXPY
 * @namespace Label
 * @description For Loop
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

/* eslint-disable @typescript-eslint/no-magic-numbers */
describe('Given Integration Label (For Loop) Cases', (): void => {

    const chance = new Chance('integration-label-for-loop');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to label for loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let i;`,
            `label: for (i = 0;i < ${value};i++) {`,
            `if (i === 10) {`,
            `break;`,
            `}`,
            `}`,
            `export default i;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(10);
    });
});
