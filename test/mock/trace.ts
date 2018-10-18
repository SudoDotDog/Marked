/**
 * @author WMXPY
 * @namespace Mock
 * @description Trace
 */

import * as EST from "estree";
import { ITrace } from "../../src/declare/variable";
import { IMockedClass } from "./node";

export class MockTrace implements ITrace, IMockedClass {

    private _mockStack: EST.Node[];

    public constructor() {

        this._mockStack = [];
    }

    public get length(): number {

        return this._mockStack.length;
    }

    public get result(): EST.Node[] {

        return this._mockStack;
    }

    public reset() {

        this._mockStack = [];
    }

    public stack(node: EST.Node): MockTrace {

        this._mockStack.push(node);
        return this;
    }
}
