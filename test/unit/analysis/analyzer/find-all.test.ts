/**
 * @author WMXPY
 * @namespace Analysis_Analyzer
 * @description Find One
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { MarkedAnalyzer } from '../../../../src/analysis/analyzer';
import { New_Line_Character } from '../../../../src/host/declare';

describe('Given (Find All) Action of {MarkedAnalyzer} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('analysis-analyzer-find-all');

    it('should be able to find all import nodes from source code', async (): Promise<void> => {

        const analyzer = await MarkedAnalyzer.fromSourceAsync([
            `import {variable} from "package";`,
            `export default variable;`,
        ].join(New_Line_Character), 'typescript');

        const nodes: EST.ImportDeclaration[] = analyzer.findAllNodes("ImportDeclaration");

        expect(nodes).to.be.lengthOf(1);
        expect(nodes[0]?.type).to.be.equal('ImportDeclaration');
    });
});
