/**
 * @author WMXPY
 * @namespace Declare
 * @description Sandbox
 */

import { MarkedDebugBreakPoint } from "../debug/break-point/break-point";
import { Evaluator } from "./evaluate";
import { ScriptLocation } from "./script-location";
import { EST_TYPE } from "./types";
import { IExposed, IScope, ITrace } from "./variable";

export type MarkedMixin = (sandbox: ISandbox) => void;

export type ModuleResolveResult = {

    readonly script: string;
    readonly scriptLocation: ScriptLocation;
};

export type SandboxLanguage = "typescript" | "javascript";
export const defaultSandboxLanguage: SandboxLanguage = "javascript";

export type ModuleResolver = (source: string, trace: ITrace) => ModuleResolveResult | null | Promise<ModuleResolveResult | null>;

export interface ISandboxOptions {

    duration: number;
    maxCodeLength: number;
    maxForLoopLimit: number;
    maxWhileLoopLimit: number;
    maxExpression: number;
}

export type OptionName = keyof ISandboxOptions;

export interface ISandbox {

    broke: boolean;
    count: number;

    bridgeScope: IScope;
    executeScope: IScope;

    usingAdditionalArgument: boolean;
    additionalArgument: any;

    use: (mixin: MarkedMixin) => this;

    break: () => this;
    skip: () => this;
    evaluate: (
        script: string,
        breakPoints?: Iterable<MarkedDebugBreakPoint>,
        scriptLocation?: ScriptLocation,
        scope?: IScope,
    ) => Promise<any>;

    config: (name: string, value?: any) => this;
    inject: (name: string, value: any) => this;
    module: (name: string) => any | null;
    mount: <M extends EST_TYPE>(type: M, evaluator: Evaluator<M>) => this;
    provide: (name: string, value: any) => this;
    resolver: (resolver: ModuleResolver) => this;

    setOption: <T extends OptionName>(name: T, value: ISandboxOptions[T]) => this;
    getOption: <T extends OptionName>(name: T) => ISandboxOptions[T];
}

export interface IExecuter {

    parent: ISandbox;
    scope: IScope;
    exposed: IExposed;

    isExecuting: () => boolean;

    evaluate: (
        script: string,
        breakPoints?: Iterable<MarkedDebugBreakPoint>,
        scriptLocation?: ScriptLocation,
    ) => Promise<any>;
}
