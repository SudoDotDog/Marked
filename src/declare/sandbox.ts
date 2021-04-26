/**
 * @author WMXPY
 * @namespace Declare
 * @description Sandbox
 */

import { Evaluator, MarkedResult } from "./evaluate";
import { ScriptLocation } from "./script-location";
import { EST_TYPE } from "./types";
import { IScope, ITrace } from "./variable";

export type ModuleResolver = (source: string, trace: ITrace) => ModuleResolveResult | null | Promise<ModuleResolveResult | null>;

export interface IMarkedOptions {

    injects?: Record<string, any>;
    provides?: Record<string, any>;
    sandbox?: Partial<ISandboxOptions>;
    resolvers?: ModuleResolver[];
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
    readonly scriptLocation: ScriptLocation;
};

export type OptionName = keyof ISandboxOptions;

export interface ISandbox {

    count: number;

    break: () => ISandbox;
    evaluate: (script: string, scriptLocation?: ScriptLocation, scope?: IScope) => Promise<any>;

    config: (name: string, value?: any) => ISandbox;
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
    scope: IScope;

    evaluate: (script: string, scriptLocation?: ScriptLocation) => Promise<MarkedResult>;
}
