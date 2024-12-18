/**
 * @author WMXPY
 * @namespace Analysis_Analyzer
 * @description Find One
 */

import Chance from "chance";
import * as EST from "estree";
import { MarkedAnalyzer } from '../../../../src/analysis/analyzer';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given (Find One) Action of {MarkedAnalyzer} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('analysis-analyzer-find-one');

    it('should be able to find one import node from source code', async (): Promise<void> => {

        const analyzer = await MarkedAnalyzer.fromSourceAsync([
            `import {variable} from "package";`,
            `export default variable;`,
        ].join(New_Line_Character), 'typescript');

        const node: EST.ImportDeclaration | null = analyzer.findOneNodeOrNull("ImportDeclaration");

        expect(node).not.toBeNull();
        expect(node?.type).toEqual('ImportDeclaration');
    });
});
