/**
 * @author WMXPY
 * @namespace Declare
 * @description Sandbox
 */

import { Evaluator } from "./evaluate";
import { ScriptLocation } from "./script-location";
import { EST_TYPE } from "./types";
import { IExposed, IScope, ITrace } from "./variable";

export interface IMarkedOptions {

    injects?: Record<string, any>;
    provides?: Record<string, any>;
    sandbox?: Partial<ISandboxOptions>;
}

export interface ISandboxOptions {

    duration: number;
    maxCodeLength: number;
    maxForLoopLimit: number;
    maxWhileLoopLimit: number;
    maxExpression: number;
}

export type ModuleResolveResult = {

    readonly script: string;
    readonly scriptLocation?: ScriptLocation;
};

export type ModuleResolver = (source: string, trace: ITrace) => ModuleResolveResult | null | Promise<ModuleResolveResult | null>;

export type OptionName = keyof ISandboxOptions;

export interface ISandbox {

    exposed: IExposed;
    count: number;

    break: () => ISandbox;
    evaluate: (script: string, scriptLocation?: ScriptLocation, scope?: IScope) => Promise<any>;

    config: (name: string, value?: any) => ISandbox;
    expose: (name: string, value: any) => ISandbox;
    inject: (name: string, value: any) => ISandbox;
    module: (name: string) => any | null;
    mount: <M extends EST_TYPE>(type: M, evaluator: Evaluator<M>) => ISandbox;
    provide: (name: string, value: any) => ISandbox;
    resolver: (resolver: ModuleResolver) => ISandbox;

    setOption: <T extends OptionName>(name: T, value: ISandboxOptions[T]) => ISandbox;
    getOption: <T extends OptionName>(name: T) => ISandboxOptions[T];
}

export interface IExecuter {

    parent: ISandbox;
}
