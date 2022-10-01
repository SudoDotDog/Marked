/**
 * @author WMXPY
 * @namespace Debug_Snapshot
 * @description Node
 */

import * as EST from "estree";
import { EST_TYPE } from "../../declare/types";

export class MarkedDebugSnapshotNode {

    public static fromNode(node: EST.Node): MarkedDebugSnapshotNode {

        return new MarkedDebugSnapshotNode(node);
    }

    private readonly _node: EST.Node;

    private constructor(node: EST.Node) {

        this._node = node;
    }

    public get type(): EST_TYPE {
        return this._node.type;
    }

    public getLeadComments(): string[] {

        if (typeof this._node.leadingComments === 'undefined') {
            return [];
        }

        return this._node.leadingComments.map((comment: EST.Comment) => {
            return comment.value;
        });
    }

    public getTailComments(): string[] {

        if (typeof this._node.trailingComments === 'undefined') {
            return [];
        }

        return this._node.trailingComments.map((comment: EST.Comment) => {
            return comment.value;
        });
    }
}
