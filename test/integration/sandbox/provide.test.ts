/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Provide
 * @override Integration Test
 */

/* eslint-disable max-classes-per-file */
import Chance from "chance";
import { Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from "../../util/assert-result";

describe('Given Integration Sandbox (Provide) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-sandbox-provide');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to fail for inject class', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        let executed: boolean = false;
        sandbox.provide("test", {
            "test": () => {
                executed = true;
            },
        });

        const result = await sandbox.evaluate([
            "import { test } from 'test';",
            "test();",
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(executed).toBeTruthy();
    });
});
