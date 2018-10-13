/**
 * @author WMXPY
 * @namespace Declare
 * @description Sandbox
 */

import { EST_TYPE, Evaluator } from "./node";
import { IExposed } from "./variable";

export type Partial<T> = {

    [P in keyof T]?: T[P];
};

export interface IMarkedOptions {
    injects?: {
        [key: string]: (...args: any[]) => Promise<any>;
    };
    provides?: {
        [key: string]: (...args: any[]) => Promise<any>;
    };
    sandbox?: Partial<ISandboxOptions>;
}

export interface ISandboxOptions {

    maxCodeLength: number;
    maxForLoopLimit: number;
    maxWhileLoopLimit: number;
    maxExpression: number;
}

export type OptionName = keyof ISandboxOptions;

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

    setOption: <T extends OptionName>(name: T, value: ISandboxOptions[T]) => ISandbox;
    getOption: <T extends OptionName>(name: T) => ISandboxOptions[T];
}
