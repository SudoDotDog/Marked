/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import { Sandbox } from "../marked/sandbox";
import { MarkedError } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { EST_TYPE, IESTreeType } from "./types";
import { IExposed, ITrace } from "./variable";

export type Evaluator<T extends EST_TYPE> =
    (this: Sandbox, node: IESTreeType[T], scope: Scope, trace: Trace) => Promise<any>;

export enum END_SIGNAL {

    SUCCEED = 0,
    FAILED = 1,
    EXCEPTION = 2,
}

export interface IMarkedResultSucceed {

    exports: IExposed;
    signal: END_SIGNAL.SUCCEED;
}

export interface IMarkedResultFailed {

    error: MarkedError;
    signal: END_SIGNAL.FAILED;
}

export interface IMarkedResultException {

    trace: ITrace;
    exception: any;
    signal: END_SIGNAL.EXCEPTION;
}

export type MarkedResult = IMarkedResultSucceed
    | IMarkedResultFailed
    | IMarkedResultException;
