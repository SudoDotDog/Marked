/**
 * @author WMXPY
 * @namespace Mock
 * @description Scope
 */

import { ERROR_CODE } from "marked#declare/error";
import { IScope, VARIABLE_TYPE } from "marked#declare/variable";
import { error } from "marked#util/error/error";
import { Scope } from "marked#variable/scope";
import { Variable } from "marked#variable/variable";
import { IMockedClass } from "./node";

export class MockScope implements IScope, IMockedClass {

    private _mockedScopeMap: Map<string, Variable<any>>;
    private _mockedConstantMap: Map<string, Variable<any>>;
    private _configs: Map<string, any>;
    private _children: MockScope[];

    private _mockedParent: MockScope | null;

    public constructor(scope?: MockScope) {

        this._mockedConstantMap = new Map<string, Variable<any>>();
        this._mockedScopeMap = new Map<string, Variable<any>>();
        this._configs = new Map<string, any>();
        this._children = [];

        this._mockedParent = scope || null;
    }

    public get children(): MockScope[] {

        return this._children;
    }

    public config(name: string, value?: any): MockScope {

        this._configs.set(name, value || true);
        return this;
    }

    public child(): MockScope {

        const subScope = new MockScope(this);
        this._children.push(subScope);
        return subScope;
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

    public register(type: VARIABLE_TYPE): (name: string, value: any) => MockScope {

        if (type === VARIABLE_TYPE.VARIABLE) {

            throw error(ERROR_CODE.VAR_DECLARATION_NOT_SUPPORT);
        }

        return type === VARIABLE_TYPE.CONSTANT ?
            this._declareConst.bind(this) :
            this._declareLet.bind(this);
    }

    public reset() {

        this._mockedConstantMap = new Map<string, Variable<any>>();
        this._mockedScopeMap = new Map<string, Variable<any>>();
    }

    public rummage(name: string): Variable<any> | null {

        if (this._mockedScopeMap.has(name)) {

            return this._mockedScopeMap.get(name) as Variable<any>;
        }

        if (this._mockedConstantMap.has(name)) {

            return this._mockedConstantMap.get(name) as Variable<any>;
        }

        return this._mockedParent ? this._mockedParent.rummage(name) : null;
    }

    protected _declareConst(name: string, value: any): MockScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedConstantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): MockScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._mockedScopeMap.set(name, variable);
        return this;
    }
}
