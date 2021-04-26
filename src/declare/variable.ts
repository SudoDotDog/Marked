/**
 * @author WMXPY
 * @namespace Declare
 * @description Variable
 */

import * as EST from "estree";
import { SandMap } from "../variable/sandmap";
import { Variable } from "../variable/variable";
import { ScriptLocation } from "./script-location";

export enum VARIABLE_TYPE {

    CONSTANT = 'const',
    SCOPED = 'let',
    VARIABLE = 'var',
}

export enum FLAG_TYPE {

    RETURN = 'RETURN',
    BREAK = 'BREAK',
    CONTINUE = 'CONTINUE',
    THROW = 'THROW',
}

export type SCOPE_DECLARE_FUNC =
    (name: string, value: any) => IScope;

export interface IExposed {

    [key: string]: any;
    default?: any;
}

export interface IScope {

    exposed: IExposed;

    config: (name: string, value?: any) => IScope;
    child: () => IScope;
    hasParent: () => boolean;
    register: (type: VARIABLE_TYPE) => SCOPE_DECLARE_FUNC;

    exist: (name: string) => boolean;
    rummage: (name: string) => Variable<any> | null;
    validateEditable: (name: string) => IScope;
    expose: (name: string, value: any) => IScope;

    findThis: () => SandMap<any>;
    initThis: () => IScope;
}

export interface ITrace {

    scriptLocation?: ScriptLocation;

    getNode(): EST.Node | null;
    getParent(): ITrace | null;
    stack(node: EST.Node): ITrace;
}
