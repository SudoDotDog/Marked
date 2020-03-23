/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import { Sandbox } from "../marked/sandbox";
import { MarkedError } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";
import { EST_TYPE, IESTreeType } from "./types";
import { IExposed } from "./variable";

export type Evaluator<T extends EST_TYPE> =
    (this: Sandbox, node: IESTreeType[T], scope: Scope, trace: Trace) => Promise<any>;

export enum END_SIGNAL {

    SUCCEED = 0,
    FAILED = 1,
}

export interface IMarkedResultSucceed {

    exports: IExposed;
    signal: END_SIGNAL.SUCCEED;
}

export interface IMarkedResultFailed {

    error: MarkedError;
    signal: END_SIGNAL.FAILED;
}

export type MarkedResult = IMarkedResultSucceed | IMarkedResultFailed;
