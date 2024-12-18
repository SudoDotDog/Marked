/**
 * @author WMXPY
 * @namespace Class
 * @description Init
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Init) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-class-init');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to init class with this value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test{`,
            `a = 10;`,
            `b = this.a + 10;`,
            `};`,
            `const instance = new Test();`,
            `export default instance.b;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.exports.default).toEqual(20);
    });

    it('should be able to init class with static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test{`,
            `static a = 10;`,
            `b = Test.a + 10;`,
            `};`,
            `const instance = new Test();`,
            `export default instance.b;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.exports.default).toEqual(20);
    });
});
