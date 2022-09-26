/**
 * @author WMXPY
 * @namespace Declare
 * @description Variable
 */

import * as EST from "estree";
import { MarkedDebugBreakPointController } from "../debug/break-point/controller";
import { ScopeLabelListener, SCOPE_LABEL_LISTENER_TYPE } from "../variable/declare";
import { SandMap } from "../variable/sand-map";
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
    FATAL = 'FATAL',
    TERMINATE = 'TERMINATE',
}

export type SCOPE_DECLARE_FUNC =
    (name: string, value: any) => IScope;

export interface IExposed {

    default?: any;
    named: Record<string, any>;
}

export interface IScope {

    constantMap: Map<string, Variable<any>>;
    scopeMap: Map<string, Variable<any>>;
    exposed: IExposed;

    isBridgeScope: () => boolean;
    isExecuteScope: () => boolean;

    config: (name: string, value?: any) => IScope;
    child: () => IScope;
    hasParent: () => boolean;
    ensureParent: () => IScope;
    register: (type: VARIABLE_TYPE) => SCOPE_DECLARE_FUNC;

    registerLabelListener: (label: string, listener: ScopeLabelListener) => void;
    executeLabelListener: (label: string, type: SCOPE_LABEL_LISTENER_TYPE) => boolean;

    exist: (name: string) => boolean;
    rummage: (name: string) => Variable<any> | null;
    validateEditable: (name: string) => IScope;
    expose: (name: string, value: any, trace: ITrace) => IScope;
    exposeDefault: (value: any, trace: ITrace) => IScope;

    findThis: () => SandMap<any>;
    initThis: () => IScope;
    replaceThis: (value: any) => IScope;
}

export interface ITrace {

    scriptLocation: ScriptLocation;

    hasBreakPointController(): boolean;
    ensureBreakPointController(): MarkedDebugBreakPointController;

    getNode(): EST.Node | null;
    getParent(): ITrace | null;

    hasLabel(): boolean;
    getLabel(): string | null;
    ensureLabel(): string;

    stack(node: EST.Node): ITrace;
    stackWithLabel(node: EST.Node, label: string): ITrace;
}
