/**
 * @author WMXPY
 * @namespace Declare
 * @description Variable
 */

import * as EST from "estree";
import { EST_TYPE, Evaluator } from "marked#declare/node";
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
    exist: (name: string) => boolean;
    register: (type: VARIABLE_TYPE) => SCOPE_DECLARE_FUNC;
    rummage: (name: string) => Variable | null;
}

export interface ISandbox {

    config: (name: string, value?: any) => ISandbox;
    mount<T extends EST_TYPE>(type: T, evaluator: Evaluator<T>): ISandbox;
    inject(name: string, value: any): ISandbox;
    evaluate(script: string): Promise<any>;
}

export interface ITrace {

    stack(node: EST.Node): ITrace;
}
