/**
 * @author WMXPY
 * @namespace InjectClass
 * @description Date
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox, SandClass } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Inject Class (Date) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-inject-class-date');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to inject class constructor', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const sandClassDate: SandClass = SandClass.create("Date");
        sandbox.inject('Date', sandClassDate);

        const result: MarkedResult = await sandbox.evaluate([
            `const date = new Date();`,
            `export default date;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({});
    });
});
