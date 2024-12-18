/**
 * @author WMXPY
 * @namespace Class
 * @description Constructor
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Constructor) Cases', (): void => {

    const chance = new Chance('integration-class-constructor');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to create a class with constructor', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const argumentResult: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate([
            `class Test{`,
            `arg = "before"`,
            `constructor(arg){`,
            `this.arg = arg;`,
            `}`,
            `};`,
            `const instance = new Test("${argumentResult}");`,
            `export default instance.arg;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(argumentResult);
    });
});
