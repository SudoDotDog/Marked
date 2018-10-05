/**
 * @author WMXPY
 * @namespace Mock
 * @description Trace
 */

import * as EST from "estree";
import { Trace } from "marked#variable/trace";

export class MockTrace extends Trace {

    private _mockStack: EST.Node[];

    public constructor() {
        super();

        this._mockStack = [];
    }

    public get result(): EST.Node[] {
        return this._mockStack;
    }

    public reset() {
        this._mockStack = [];
    }

    public stack(node: EST.Node): Trace {
        this._mockStack.push(node);
        return this;
    }
}
