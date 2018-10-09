/**
 * @author WMXPY
 * @namespace Declare
 * @description Variable
 */

import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
import { Variable } from "marked#variable/variable";
import { SandMap } from "marked#variable/sandmap";

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

    config: (name: string, value?: any) => ISandbox;
    expose: (name: string, value: any) => ISandbox;
    mount: <M extends EST_TYPE>(type: M, evaluator: Evaluator<M>) => ISandbox;
    inject: (name: string, value: any) => ISandbox;
    evaluate: (script: string) => Promise<any>;
}

export interface ITrace {

    stack(node: EST.Node): ITrace;
}
