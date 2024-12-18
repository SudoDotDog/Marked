/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Tagged Template Expression
 * @override E2E Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe('Given Sandbox for <TaggedTemplateExpression> Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('sandbox-tagged-template-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to call with sand function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate([
            'const func=(args,...values)=>({args,values});',
            'const a="A"',
            'const b="B"',
            'export default func`${a}1${b}2`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({
            args: ['', '1', '2'],
            values: ['A', 'B'],
        });
    });

    it('should be able to call with sand function - single value', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate([
            'const func=(args,...values)=>({args,values});',
            'const a="A"',
            'export default func`${a}`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({
            args: ['', ''],
            values: ['A'],
        });
    });

    it('should be able to call with sand function - single arg', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate([
            'const func=(args,...values)=>({args,values});',
            'export default func`123`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({
            args: ['123'],
            values: [],
        });
    });

    it('should be able to call with native function', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.inject('func', (args: string[], ...values: string[]) => {
            return { args, values };
        });

        const result = await sandbox.evaluate([
            'const a="A"',
            'const b="B"',
            'export default func`${a}1${b}2`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({
            args: ['', '1', '2'],
            values: ['A', 'B'],
        });
    });

    it('should be able to call with native function with additional argument', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        sandbox.setAdditionalArgument('additional');
        sandbox.inject('func', (additional: string, args: string[], ...values: string[]) => {
            return { additional, args, values };
        });

        const result = await sandbox.evaluate([
            'const a="A"',
            'const b="B"',
            'export default func`${a}1${b}2`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual({
            additional: 'additional',
            args: ['', '1', '2'],
            values: ['A', 'B'],
        });
    });
});
