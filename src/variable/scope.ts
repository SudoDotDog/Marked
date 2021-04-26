/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope
 */

import { ERROR_CODE } from "../declare/error";
import { IExposed, IScope, VARIABLE_TYPE } from "../declare/variable";
import { error } from "../util/error/error";
import { Variable } from "../variable/variable";
import { SandMap } from "./sandmap";

export class Scope implements IScope {

    public static fromRoot(): Scope {

        return new Scope().initThis();
    }

    private _parent: Scope | null;

    private readonly _exposed: Map<string, any>;

    private _constantMap: Map<string, Variable<any>>;
    private _scopeMap: Map<string, Variable<any>>;
    private _configs: Map<string, any>;

    private _throwValue: Variable<any> | null;

    private _this: SandMap<any> | null;

    public constructor(scope?: Scope) {

        this._parent = scope || null;

        this._exposed = new Map<string, any>();

        this._constantMap = new Map<string, Variable<any>>();
        this._scopeMap = new Map<string, Variable<any>>();
        this._configs = new Map<string, any>();

        this._throwValue = null;

        this._this = null;
    }

    public get exposed(): IExposed {

        const result: IExposed = {

            default: this._exposed.get('default'),
            named: this._exposed,
        };
        return result;
    }

    public config(name: string, value?: any): Scope {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public child(): Scope {

        return new Scope(this);
    }

    public findThis(): SandMap<any> {

        if (this._this) {

            return this._this;
        } else {

            if (this._parent) {

                return this._parent.findThis();
            }
            throw error(ERROR_CODE.UNKNOWN_ERROR, 'this');
        }
    }

    public initThis(): Scope {

        this._this = new SandMap<any>();
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

    public hasParent(): boolean {

        if (this._parent) {

            return Boolean(this._parent.hasParent());
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

        if (this._parent) {

            this._parent.validateEditable(name);
        } else {

            if (!this._scopeMap.has(name)) {

                throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, name);
            }
        }
        return this;
    }

    public expose(name: string, value: any): Scope {

        this._exposed.set(name, value);
        return this;
    }

    public setThrow(value: any): Scope {

        const variable = new Variable(value);
        this._throwValue = variable;
        return this;
    }

    public hasThrow(): boolean {

        return this._throwValue !== null;
    }

    public getThrow(): Variable<any> | null {

        return this._throwValue;
    }

    protected _declareConst(name: string, value: any): Scope {

        if (this.exist(name)) {

            throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        }
        const variable = new Variable(value);
        this._constantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): Scope {

        if (this.exist(name)) {

            throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        }
        const variable = new Variable(value);
        this._scopeMap.set(name, variable);
        return this;
    }
}
