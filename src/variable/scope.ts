/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope
 */

import { ERROR_CODE } from "marked#declare/error";
import { IScope, VARIABLE_TYPE } from "marked#declare/variable";
import { error } from "marked#util/error/error";
import { Variable } from "marked#variable/variable";

export class Scope implements IScope {

    public static fromRoot(): Scope {

        return new Scope();
    }

    private _parent: Scope | null;

    private _constantMap: Map<string, Variable<any>>;
    private _scopeMap: Map<string, Variable<any>>;
    private _configs: Map<string, any>;

    public constructor(scope?: Scope) {

        this._parent = scope || null;

        this._constantMap = new Map<string, Variable<any>>();
        this._scopeMap = new Map<string, Variable<any>>();
        this._configs = new Map<string, any>();
    }

    public config(name: string, value?: any): Scope {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public child(): Scope {
        return new Scope(this);
    }

    public exist(name: string): boolean {

        if (this._scopeMap.has(name)) {
            return true;
        }
        if (this._constantMap.has(name)) {
            return true;
        }
        return false;
    }

    public register(type: VARIABLE_TYPE): (name: string, value: any) => Scope {

        if (type === VARIABLE_TYPE.VARIABLE) {
            throw error(ERROR_CODE.VAR_DECLARATION_NOT_SUPPORT);
        }

        return type === VARIABLE_TYPE.CONSTANT ?
            this._declareConst.bind(this) :
            this._declareLet.bind(this);
    }

    public rummage(name: string): Variable<any> | null {

        if (this._scopeMap.has(name)) {
            return this._scopeMap.get(name) as Variable<any>;
        }

        if (this._constantMap.has(name)) {
            return this._constantMap.get(name) as Variable<any>;
        }

        return this._parent ? this._parent.rummage(name) : null;
    }

    public validateEditable(name: string): Scope {

        if (this._constantMap.has(name)) {
            throw error(ERROR_CODE.CONSTANT_VARIABLE_CANNOT_BE_EDITED, name);
        }

        if (!this._scopeMap.has(name)) {
            throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, name);
        }

        return this;
    }

    protected _declareConst(name: string, value: any): Scope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._constantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): Scope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._scopeMap.set(name, variable);
        return this;
    }
}
