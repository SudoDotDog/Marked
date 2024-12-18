/**
 * @author WMXPY
 * @namespace Analysis_Analyzer
 * @description Location
 */

import Chance from "chance";
import * as EST from "estree";
import { MarkedAnalyzer } from '../../../../src/analysis/analyzer';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given (Location) Action of {MarkedAnalyzer} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('analysis-analyzer-location');

    it('should be able to get updated location from source code', async (): Promise<void> => {

        const analyzer = await MarkedAnalyzer.fromSourceAsync([
            `const a: string = "a";`,
        ].join(New_Line_Character), 'typescript');

        const node: EST.Literal | null = analyzer.findOneNodeOrNull("Literal");

        expect(node).not.toBeNull();
        expect(node?.loc).toEqual({
            start: {
                column: 18,
                line: 1,
            },
            end: {
                column: 21,
                line: 1,
            },
        });
    });
});
