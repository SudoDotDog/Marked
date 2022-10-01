/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Node
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedDebugSnapshotNode } from '../../../../src/debug/snapshot/node';

describe('Given {MarkedDebugSnapshotNode} Class', (): void => {

    const chance: Chance.Chance = new Chance('debug-snapshot-node');

    it('should be able to construct with fromNode factory method', async (): Promise<void> => {

        const identifierName: string = chance.string();

        const node: MarkedDebugSnapshotNode = MarkedDebugSnapshotNode.fromNode({
            type: 'Identifier',
            name: identifierName,
        });

        expect(node.type).to.be.equal('Identifier');
        expect(node.getLeadComments()).to.be.deep.equal([]);
        expect(node.getTailComments()).to.be.deep.equal([]);
    });

    it('should be able to get lead comments', async (): Promise<void> => {

        const identifierName: string = chance.string();

        const node: MarkedDebugSnapshotNode = MarkedDebugSnapshotNode.fromNode({
            type: 'Identifier',
            name: identifierName,
            leadingComments: [
                {
                    type: 'Line',
                    value: 'test',
                },
            ],
        });

        expect(node.getLeadComments()).to.be.deep.equal([
            'test',
        ]);
        expect(node.getTailComments()).to.be.deep.equal([]);
    });

    it('should be able to get tailing comments', async (): Promise<void> => {

        const identifierName: string = chance.string();

        const node: MarkedDebugSnapshotNode = MarkedDebugSnapshotNode.fromNode({
            type: 'Identifier',
            name: identifierName,
            trailingComments: [
                {
                    type: 'Line',
                    value: 'test',
                },
            ],
        });

        expect(node.getLeadComments()).to.be.deep.equal([]);
        expect(node.getTailComments()).to.be.deep.equal([
            'test',
        ]);
    });
});
