/**
 * @author WMXPY
 * @namespace SourceMap
 * @description Simple
 * @override Integration Test
 */

import Chance from "chance";
import { emitTypeScriptTransform, EmitTypeScriptTransformResult, New_Line_Character } from '../../../src';
import { SegmentSourceMapLocationFinder } from '../../../src/source-map/location-finder/segment';

describe('Given Integration Source Map (Simple) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-source-map-simple');

    it('should be able to get original position for single line script', async (): Promise<void> => {

        const emitResult: EmitTypeScriptTransformResult = await emitTypeScriptTransform([
            `export const a: string = 'hello';`,
            `export const b: string = 'hello';`,
            `export const c: string = 'hello';`,
        ].join(New_Line_Character));

        const locationFinder: SegmentSourceMapLocationFinder = SegmentSourceMapLocationFinder.fromSourceMap(emitResult.sourceMap);

        expect(locationFinder.findSourceLocation({
            line: 1,
            column: 0,
        }, null as any).line).toEqual(1);
    });
});
