/**
 * @author WMXPY
 * @namespace HashBang
 * @description Hash Bang
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, PARSE_ESTREE_COMMENT_TYPE, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Hand Bang (Hash Bang) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-hash-bang-hash-bang');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute with start point is hash bang', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `#!/usr/bin/env 111`,
            `export default 10;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(10);
        expect(result.comments).toHaveLength(1);
        expect(result.comments[0].type).toEqual(PARSE_ESTREE_COMMENT_TYPE.HASH_BANG);
    });
});
