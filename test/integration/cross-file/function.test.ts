/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Function
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Function) Cases', (): void => {

    const chance = new Chance('integration-cross-file-function');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute cross file function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const aValue: number = chance.integer({ min: 0, max: 100 });

        sandbox.resolver(() => {
            return {
                script: `export const func = () => ${aValue};`,
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate([
            `import {func} from 'test';`,
            `export default func();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(aValue);
    });

    it('should be able to execute cross file function with namespace import', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const aValue: number = chance.integer({ min: 0, max: 100 });

        sandbox.resolver(() => {
            return {
                script: `export const func = () => ${aValue};`,
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate([
            `import * as Test from 'test';`,
            `export default Test.func();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(aValue);
    });
});
