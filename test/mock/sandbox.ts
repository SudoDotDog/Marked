/**
 * @author WMXPY
 * @namespace Mock
 * @description Sandbox
 */

import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { IESTreeType } from "marked#declare/types";
import { ISandbox, IScope, ITrace } from "marked#declare/variable";
import { IMockedClass } from "./node";

export class MockSandbox implements ISandbox, IMockedClass {

    private _executedList: EST.BaseNode[];
    private _mockMap: Map<any, any>;

    private _configs: Map<string, any>;

    public constructor() {

        this._executedList = [];
        this._mockMap = new Map<any, any>();

        this._configs = new Map<string, any>();
    }

    public get result(): EST.BaseNode[] {
        return this._executedList;
    }

    public config(name: string, value?: any): MockSandbox {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public mount<T extends EST_TYPE>(type: T, evaluator: Evaluator<T>): MockSandbox {

        this._mockMap.set(type, evaluator);
        return this;
    }

    public inject(name: string, value: any): MockSandbox {

        return this;
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

    public async evaluate(script: string): Promise<any> {

        return;
    }

    protected async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        this._executedList.push(node);
        if (this._mockMap.has(node.type)) {
            return this._mockMap.get(node.type)(node);
        }
        return null;
    }
}
