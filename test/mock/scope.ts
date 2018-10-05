/**
 * @author WMXPY
 * @namespace Mock
 * @description Scope
 */

import { IScope, VARIABLE_TYPE } from "marked#declare/variable";
import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";
import { Variable } from "marked#variable/variable";
import { IMockedClass } from "./node";

export class MockScope implements IScope, IMockedClass {

    private _mockedScopeMap: Map<string, Variable>;
    private _mockedConstantMap: Map<string, Variable>;
    private _configs: Map<string, any>;

    private _mockedParent: Scope | null;

    public constructor(scope?: Scope) {
        this._mockedConstantMap = new Map<string, Variable>();
        this._mockedScopeMap = new Map<string, Variable>();
        this._configs = new Map<string, any>();

        this._mockedParent = scope || null;
    }

    public config(name: string, value?: any): IScope {
        this._configs.set(name, value || true);
        return this;
    }

    public exist(name: string): boolean {
        if (this._mockedScopeMap.has(name)) {
            return true;
        }
        if (this._mockedConstantMap.has(name)) {
            return true;
        }
        return false;
    }

    public register(type: VARIABLE_TYPE): (name: string, value: any) => IScope {

        if (type === VARIABLE_TYPE.VARIABLE) {
            throw error(ERROR_CODE.VAR_DECLARATION_NOT_SUPPORT);
        }

        return type === VARIABLE_TYPE.CONSTANT ?
            this._declareConst.bind(this) :
            this._declareLet.bind(this);
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

    protected _declareConst(name: string, value: any): IScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedConstantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): IScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedScopeMap.set(name, variable);
        return this;
    }
}
