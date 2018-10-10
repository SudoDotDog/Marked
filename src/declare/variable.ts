/**
 * @author WMXPY
 * @namespace Declare
 * @description Variable
 */

import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { SandMap } from "marked#variable/sandmap";
import { Variable } from "marked#variable/variable";

export enum VARIABLE_TYPE {

    CONSTANT = 'const',
    SCOPED = 'let',
    VARIABLE = 'var',
}

export enum SCOPE_TYPE {

}

export enum FLAG_TYPE {

    RETURN = 'RETURN',
    BREAK = 'BREAK',
    CONTINUE = 'CONTINUE',
}

export type SCOPE_DECLARE_FUNC = (name: string, value: any) => IScope;

export interface IScope {

    config: (name: string, value?: any) => IScope;
    child: () => IScope;
    hasParent: () => boolean;
    register: (type: VARIABLE_TYPE) => SCOPE_DECLARE_FUNC;

    exist: (name: string) => boolean;
    rummage: (name: string) => Variable<any> | null;

    findThis: () => SandMap<any>;
    initThis: () => IScope;
}

export interface IExposed {
    [key: string]: any;
    default?: any;
}

export interface ISandbox {

    exposed: IExposed;
    count: number;

    evaluate: (script: string) => Promise<any>;

    config: (name: string, value?: any) => ISandbox;
    expose: (name: string, value: any) => ISandbox;
    inject: (name: string, value: any) => ISandbox;
    module: (name: string) => any | null;
    mount: <M extends EST_TYPE>(type: M, evaluator: Evaluator<M>) => ISandbox;
    provide: (name: string, value: any) => ISandbox;
}

export interface ITrace {

    stack(node: EST.Node): ITrace;
}
