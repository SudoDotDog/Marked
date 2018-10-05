/**
 * @author WMXPY
 * @namespace Mock
 * @description Scope
 */

import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";
import { Variable } from "marked#variable/variable";
import { IMockedClass } from "./node";

export class MockScope extends Scope implements IMockedClass {

    private _mockedScopeMap: Map<string, Variable>;
    private _mockedConstantMap: Map<string, Variable>;

    private _mockedParent: Scope | null;

    public constructor(scope?: Scope) {
        super();
        this._mockedConstantMap = new Map<string, Variable>();
        this._mockedScopeMap = new Map<string, Variable>();

        this._mockedParent = scope || null;
    }

    public reset() {
        this._mockedConstantMap = new Map<string, Variable>();
        this._mockedScopeMap = new Map<string, Variable>();
    }

    public rummage(name: string): Variable | null {
        if (this._mockedScopeMap.has(name)) {
            return this._mockedScopeMap.get(name) as Variable;
        }

        if (this._mockedConstantMap.has(name)) {
            return this._mockedConstantMap.get(name) as Variable;
        }

        return this._mockedParent ? this._mockedParent.rummage(name) : null;
    }

    protected _declareConst(name: string, value: any): Scope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedConstantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): Scope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedScopeMap.set(name, variable);
        return this;
    }
}
