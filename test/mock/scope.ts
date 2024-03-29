/**
 * @author WMXPY
 * @namespace Mock
 * @description Scope
 */

import { ERROR_CODE } from "../../src/declare/error-code";
import { IExposed, IScope, VARIABLE_TYPE } from "../../src/declare/variable";
import { error } from "../../src/util/error/error";
import { ScopeLabelListener, SCOPE_LABEL_LISTENER_TYPE } from "../../src/variable/declare";
import { SandMap } from "../../src/variable/sand-map";
import { Variable } from "../../src/variable/variable";
import { IMockedClass } from "./node";

export class MockScope implements IScope, IMockedClass {

    private _defaultExposed: any;
    private readonly _exposed: Map<string, any>;

    private _mockedScopeMap: Map<string, Variable<any>>;
    private _mockedConstantMap: Map<string, Variable<any>>;
    private _configs: Map<string, any>;
    private _children: MockScope[];

    private _mockedParent: MockScope | null;

    private _this: SandMap<any> | null;

    public constructor(scope?: MockScope) {

        this._defaultExposed = undefined;
        this._exposed = new Map<string, any>();

        this._mockedConstantMap = new Map<string, Variable<any>>();
        this._mockedScopeMap = new Map<string, Variable<any>>();
        this._configs = new Map<string, any>();
        this._children = [];

        this._mockedParent = scope || null;
        this._this = null;
    }

    public get children(): MockScope[] {

        return this._children;
    }

    public get constantMap(): Map<string, Variable<any>> {
        return this._mockedConstantMap;
    }
    public get scopeMap(): Map<string, Variable<any>> {
        return this._mockedScopeMap;
    }

    public get exposed(): IExposed {

        const result: IExposed = {

            default: this._defaultExposed,
            named: this._exposed,
        };
        return result;
    }

    public isBridgeScope(): boolean {

        return false;
    }

    public isExecuteScope(): boolean {

        return true;
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

    public findThis(): SandMap<any> {

        if (this._this) {

            return this._this;
        } else {

            if (this._mockedParent) {
                return this._mockedParent.findThis();
            }
            throw error(ERROR_CODE.UNKNOWN_ERROR, 'this');
        }
    }

    public initThis(): MockScope {

        this._this = SandMap.fromScratch();
        return this;
    }

    public replaceThis(thisValue: any): MockScope {

        this._this = thisValue;
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

    public hasParent(): boolean {

        return Boolean(this._mockedParent);
    }

    public ensureParent(): MockScope {

        return this._mockedParent as MockScope;
    }

    public registerLabelListener(_label: string, _listener: ScopeLabelListener): void {

        return;
    }

    public executeLabelListener(_label: string, _type: SCOPE_LABEL_LISTENER_TYPE): boolean {

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

    public reset(): this {

        this._mockedConstantMap = new Map<string, Variable<any>>();
        this._mockedScopeMap = new Map<string, Variable<any>>();
        this._children = [];
        return this;
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

    public validateEditable(name: string): MockScope {

        if (this._mockedConstantMap.has(name)) {

            throw error(ERROR_CODE.CONSTANT_VARIABLE_CANNOT_BE_EDITED, name);
        }

        if (!this._mockedScopeMap.has(name)) {

            throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, name);
        }

        return this;
    }

    public expose(name: string, value: any): MockScope {

        this._exposed.set(name, value);
        return this;
    }

    public exposeDefault(value: any): MockScope {

        this._defaultExposed = value;
        return this;
    }

    protected _declareConst(name: string, value: any): MockScope {

        if (this.exist(name)) { throw error(ERROR_CODE.DUPLICATED_VARIABLE); }
        const variable = Variable.immutable(value);
        this._mockedConstantMap.set(name, variable);
        return this;
    }

    protected _declareLet(name: string, value: any): MockScope {

        if (this.exist(name)) { throw error(ERROR_CODE.DUPLICATED_VARIABLE); }
        const variable = Variable.mutable(value);
        this._mockedScopeMap.set(name, variable);
        return this;
    }
}
