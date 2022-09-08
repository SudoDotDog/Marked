/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Tagged Template Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';
import { assertSucceedMarkedResult } from '../util/assert-result';

describe.only('Given Sandbox for <TaggedTemplateExpression> Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('sandbox-tagged-template-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to call with empty string', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result = await sandbox.evaluate([
            'const a=(args)=>args;',
            'export default a`${hello}`',
        ].join('\n'));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal("");
    });
});
