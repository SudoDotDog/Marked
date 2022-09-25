/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope
 */

import { ERROR_CODE } from "../declare/error-code";
import { IExposed, IScope, ITrace, VARIABLE_TYPE } from "../declare/variable";
import { extractSandToNative } from "../parse/sand-to-native";
import { error } from "../util/error/error";
import { Variable } from "../variable/variable";
import { SandMap } from "./sand-map";

export const BRIDGE_SCOPE_SYMBOL: unique symbol = Symbol('bridge-scope');
export const EXECUTE_SCOPE_SYMBOL: unique symbol = Symbol('execute-scope');

type ScopeSymbol =
    | typeof BRIDGE_SCOPE_SYMBOL
    | typeof EXECUTE_SCOPE_SYMBOL;

export class Scope implements IScope {

    public static bridgeScope(): Scope {

        const scope: Scope = new Scope(undefined, BRIDGE_SCOPE_SYMBOL);
        scope.initThis();

        return scope;
    }

    public static executeScope(parent: IScope): Scope {

        if (!parent.isBridgeScope()) {
            throw error(ERROR_CODE.INTERNAL_ERROR, 'only bridge scope can create execute scope');
        }

        const scope: Scope = new Scope(parent, EXECUTE_SCOPE_SYMBOL);
        scope.initThis();

        return scope;
    }

    private readonly _symbol?: ScopeSymbol;

    private readonly _parent: IScope | null;

    private _defaultExposed: any;
    private readonly _exposed: Map<string, any>;

    private readonly _labelListeners: Map<string, () => void>;

    private _constantMap: Map<string, Variable<any>>;
    private _scopeMap: Map<string, Variable<any>>;
    private _configs: Map<string, any>;

    private _throwValue: Variable<any> | null;

    private _this: SandMap<any> | null;

    public constructor(scope?: IScope, symbol?: ScopeSymbol) {

        this._symbol = symbol;

        this._parent = scope || null;

        this._defaultExposed = undefined;
        this._exposed = new Map<string, any>();

        this._labelListeners = new Map<string, () => void>();

        this._constantMap = new Map<string, Variable<any>>();
        this._scopeMap = new Map<string, Variable<any>>();
        this._configs = new Map<string, any>();

        this._throwValue = null;

        this._this = null;
    }

    public get constantMap(): Map<string, Variable<any>> {
        return this._constantMap;
    }
    public get scopeMap(): Map<string, Variable<any>> {
        return this._scopeMap;
    }

    public get exposed(): IExposed {

        if (this.hasParent()) {

            const parent: IScope = this.ensureParent();

            if (!parent.isBridgeScope()) {
                return parent.exposed;
            }
        }

        const namedObject: Record<string, any> = {};
        for (const key of this._exposed.keys()) {
            namedObject[key] = this._exposed.get(key);
        }

        const result: IExposed = {

            default: this._defaultExposed,
            named: namedObject,
        };
        return result;
    }

    public isBridgeScope(): boolean {

        return this._symbol === BRIDGE_SCOPE_SYMBOL;
    }

    public isExecuteScope(): boolean {

        return this._symbol === EXECUTE_SCOPE_SYMBOL;
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

    public replaceThis(thisValue: SandMap<any>): this {

        this._this = thisValue;
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

        return this._parent !== null;
    }

    public ensureParent(): IScope {

        if (this._parent) {

            return this._parent;
        }
        throw error(ERROR_CODE.INTERNAL_ERROR);
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

    public registerLabelListener(label: string, listener: () => void): this {

        this._labelListeners.set(label, listener);
        return this;
    }

    public executeLabelListener(label: string): boolean {

        if (this._labelListeners.has(label)) {

            const listener: () => void =
                this._labelListeners.get(label) as () => void;
            listener();
            return true;
        }

        if (this._parent) {

            return this._parent.executeLabelListener(label);
        }

        return false;
    }

    public validateEditable(name: string): IScope {

        if (this._constantMap.has(name)) {

            throw error(ERROR_CODE.CONSTANT_VARIABLE_CANNOT_BE_EDITED, name);
        }

        if (this._scopeMap.has(name)) {

            return this;
        }

        if (!this._parent) {

            throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, name);
        }

        this._parent.validateEditable(name);
        return this;
    }

    public expose(key: string, value: any, trace: ITrace): Scope {

        if (this.hasParent()) {

            const parent: IScope = this.ensureParent();
            if (!parent.isBridgeScope()) {
                parent.expose(key, value, trace);
                return this;
            }
        }

        if (!trace.scriptLocation.isRoot()) {
            this._exposed.set(key, value);
        } else {
            const extractedValue: any = extractSandToNative(value);
            this._exposed.set(key, extractedValue);
        }
        return this;
    }

    public exposeDefault(value: any, trace: ITrace): Scope {


        if (this.hasParent()) {

            const parent: IScope = this.ensureParent();
            if (!parent.isBridgeScope()) {
                parent.exposeDefault(value, trace);
                return this;
            }
        }

        if (!trace.scriptLocation.isRoot()) {
            this._defaultExposed = value;
        } else {
            const extractedValue: any = extractSandToNative(value);
            this._defaultExposed = extractedValue;
        }
        return this;
    }

    public setThrow(value: any): Scope {

        const variable = Variable.immutable(value);
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
        const variable = Variable.immutable(value);
        this._constantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): Scope {

        if (this.exist(name)) {

            throw error(ERROR_CODE.DUPLICATED_VARIABLE);
        }
        const variable = Variable.mutable(value);
        this._scopeMap.set(name, variable);
        return this;
    }
}
