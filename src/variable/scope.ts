/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope
 */

import { IScope, VARIABLE_TYPE } from "marked#declare/variable";
import { error, ERROR_CODE } from "marked#util/error";
import { Variable } from "marked#variable/variable";

export class Scope implements IScope {

    public static fromScope(scope: Scope): Scope {

        return new Scope(scope);
    }

    public static fromRoot(): Scope {

        return new Scope();
    }

    private _parent: IScope | null;

    private _constantMap: Map<string, Variable>;
    private _scopeMap: Map<string, Variable>;
    private _configs: Map<string, any>;

    public constructor(scope?: IScope) {

        this._parent = scope || null;

        this._constantMap = new Map<string, Variable>();
        this._scopeMap = new Map<string, Variable>();
        this._configs = new Map<string, any>();
    }

    public config(name: string, value?: any): IScope {

        this._configs.set(name, value === undefined ? true : value);
        return this;
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

    public register(type: VARIABLE_TYPE): (name: string, value: any) => IScope {

        if (type === VARIABLE_TYPE.VARIABLE) {
            throw error(ERROR_CODE.VAR_DECLARATION_NOT_SUPPORT);
        }

        return type === VARIABLE_TYPE.CONSTANT ?
            this._declareConst.bind(this) :
            this._declareLet.bind(this);
    }

    public rummage(name: string): Variable | null {
        if (this._scopeMap.has(name)) {
            return this._scopeMap.get(name) as Variable;
        }

        if (this._constantMap.has(name)) {
            return this._constantMap.get(name) as Variable;
        }

        return this._parent ? this._parent.rummage(name) : null;
    }

    protected _declareConst(name: string, value: any): IScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._constantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): IScope {

        if (this.exist(name)) throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        const variable = new Variable(value);
        this._scopeMap.set(name, variable);
        return this;
    }
}
