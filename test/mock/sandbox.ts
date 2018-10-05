/**
 * @author WMXPY
 * @namespace Mock
 * @description Sandbox
 */

import * as EST from "estree";
import { EST_TYPE } from "marked#declare/node";
import { IESTreeType } from "marked#declare/types";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "../../src/sandbox";

export class MockSandbox extends Sandbox {
    private _executedList: EST.BaseNode[];
    private _mockMap: Map<any, any>;

    public constructor() {
        super();
        this._executedList = [];
        this._mockMap = new Map<any, any>();
    }

    public get result(): EST.BaseNode[] {
        return this._executedList;
    }

    public when<T extends EST_TYPE>(type: T, mock: (node: IESTreeType[T]) => any): MockSandbox {
        this._mockMap.set(type, mock);
        return this;
    }

    public reset(): MockSandbox {
        this._mockMap.clear();
        this._executedList = [];
        return this;
    }

    protected async execute(node: EST.BaseNode, scope: Scope, trace: Trace): Promise<any> {

        this._executedList.push(node);
        if (this._mockMap.has(node.type)) {
            return this._mockMap.get(node.type)(node);
        }
        return null;
    }
}
