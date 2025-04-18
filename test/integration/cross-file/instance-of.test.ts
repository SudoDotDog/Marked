/**
 * @author WMXPY
 * @namespace CrossFile
 * @description Instance Of
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, Sandbox, ScriptLocation } from '../../../src';
import { New_Line_Character } from '../../../src/host/declare';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Cross File (Instance Of) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-cross-file-instance-of');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute cross file instance of operation', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.resolver(() => {
            return {
                script: [
                    `class A{}`,
                    `export default A;`,
                ].join(New_Line_Character),
                scriptLocation: ScriptLocation.create('mock', 'test'),
            };
        });

        const result: MarkedResult = await sandbox.evaluate(`import A from 'test';const a = new A();export default a instanceof A;`);

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toBeTruthy();
    });

    it('should be able to execute cross file instance of operation - cross two files', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        sandbox.resolver((path: string) => {

            if (path === 'class') {

                return {
                    script: [
                        `class A{}`,
                        `export default A;`,
                    ].join(New_Line_Character),
                    scriptLocation: ScriptLocation.create('mock', 'class'),
                };
            } else if (path === 'instance') {

                return {
                    script: [
                        `import A from 'class';`,
                        `const a = new A();`,
                        `export default a;`,
                    ].join(New_Line_Character),
                    scriptLocation: ScriptLocation.create('mock', 'instance'),
                };
            }
            return null;
        });

        const result: MarkedResult = await sandbox.evaluate([
            `import A from 'class';`,
            `import a from 'instance';`,
            `export default a instanceof A;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toBeTruthy();
    });
});
