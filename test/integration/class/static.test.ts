/**
 * @author WMXPY
 * @namespace Class
 * @description Static
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Class (Static) Cases', (): void => {

    const chance = new Chance('integration-class-static');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators('typescript');
        return sandbox;
    };

    it('should be able to assign and get static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class ${className}{static a=1;};export default ${className}.a;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(1);
    });

    it('should be able to assign override and get static value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const className: string = chance.word();

        const result: MarkedResult = await sandbox.evaluate(`class ${className}{static name=1;};export default ${className}.name;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(1);
    });
});
