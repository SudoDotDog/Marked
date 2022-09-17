/**
 * @author WMXPY
 * @namespace Mock
 * @description Sandbox
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../src/declare/error-code";
import { Evaluator } from "../../src/declare/evaluate";
import { ISandbox, ISandboxOptions, MarkedMixin, ModuleResolver, OptionName } from "../../src/declare/sandbox";
import { EST_TYPE, IESTreeType } from "../../src/declare/types";
import { IExposed, IScope, ITrace } from "../../src/declare/variable";
import { assert } from "../../src/util/error/assert";
import { getDefaultSandboxOption } from "../../src/util/options";
import { IMockedClass } from "./node";

export class MockSandbox implements ISandbox, IMockedClass {

    private _executedList: EST.BaseNode[];
    private _mockMap: Map<any, any>;

    private _broke: boolean;
    private _configs: Map<string, any>;
    private _exposed: Map<string, any>;
    private _modules: Map<string, any>;

    private readonly _resolvers: ModuleResolver[];

    private _options: ISandboxOptions;

    public constructor() {

        this._executedList = [];
        this._mockMap = new Map<any, any>();

        this._broke = false;
        this._configs = new Map<string, any>();
        this._exposed = new Map<string, any>();
        this._modules = new Map<string, any>();

        this._resolvers = [];

        this._options = getDefaultSandboxOption();
    }

    public get broke(): boolean {
        return this._broke;
    }

    public get count(): number {
        return this._executedList.length;
    }

    public get bridgeScope(): any {
        return undefined as any;
    }
    public get executeScope(): any {
        return undefined as any;
    }

    public get exposed(): IExposed {

        const result: IExposed = {
            default: this._exposed.get('default'),
            named: new Map(),
        };
        return result;
    }

    public get result(): EST.BaseNode[] {

        return this._executedList;
    }

    public use(mixin: MarkedMixin): this {

        mixin(this);
        return this;
    }

    public break(): this {

        this._broke = true;
        return this;
    }

    public config(name: string, value?: any): this {

        this._configs.set(name, value === undefined ? true : value);
        return this;
    }

    public expose(name: string, value: any): this {

        this._exposed.set(name, value);
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public inject(name: string, value: any): this {

        return this;
    }

    public module(name: string): any | null {

        return this._modules.get(name) || null;
    }

    public mount<T extends EST_TYPE>(type: T, evaluator: Evaluator<T>): this {

        this._mockMap.set(type, evaluator);
        return this;
    }

    public provide(name: string, value: any): this {

        this._modules.set(name, value);
        return this;
    }

    public resolver(resolver: ModuleResolver): this {

        this._resolvers.push(resolver);
        return this;
    }

    public when<T extends EST_TYPE>(type: T, mock: (node: IESTreeType[T], scope?: any, trace?: any) => any): MockSandbox {

        this._mockMap.set(type, mock);
        return this;
    }

    public reset(): MockSandbox {

        this._mockMap.clear();
        this._executedList = [];
        return this;
    }

    public getOption<T extends OptionName>(name: T): ISandboxOptions[T] {

        const value: ISandboxOptions[T] = this._options[name];
        return assert(value).to.be.exist(ERROR_CODE.UNKNOWN_ERROR).firstValue();
    }

    public setOption<T extends OptionName>(name: T, value: ISandboxOptions[T]): this {

        this._options[name] = value;
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async evaluate(script: string): Promise<string> {

        return script;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async execute(node: EST.BaseNode, scope: IScope, trace: ITrace): Promise<any> {

        this._executedList.push(node);
        if (this._mockMap.has(node.type)) {
            return this._mockMap.get(node.type).bind(this)(node, scope, trace);
        }

        return null;
    }
}
