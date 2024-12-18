/**
 * @author WMXPY
 * @namespace Comments
 * @description Comments
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, PARSE_ESTREE_COMMENT_TYPE, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Comments (Comments) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-comments-comments');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to find leading comments', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `/* leading */ return 10;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.rootReturn.hasRootReturn).toBeTruthy();
        expect((result.rootReturn as any).returnValue).toEqual(10);

        expect(result.comments).toEqual([{
            type: PARSE_ESTREE_COMMENT_TYPE.BLOCK,
            text: ' leading ',
            start: 0,
            end: 13,
        }]);
    });

    it('should be able to find tailing comments', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `return 10; // Tailing`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.rootReturn.hasRootReturn).toBeTruthy();
        expect((result.rootReturn as any).returnValue).toEqual(10);

        expect(result.comments).toEqual([{
            type: PARSE_ESTREE_COMMENT_TYPE.LINE,
            text: ' Tailing',
            start: 11,
            end: 21,
        }]);
    });
});
