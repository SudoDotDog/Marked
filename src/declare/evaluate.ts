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

    SUCCEED = "SUCCEED",
    TERMINATED = "TERMINATED",
    FAILED = "FAILED",
    EXCEPTION = "EXCEPTION",
}

export type MarkedResultSucceedRootReturn =
    | {
        hasRootReturn: true;
        returnValue: any;
    }
    | {
        hasRootReturn: false;
    };

export interface IMarkedResultSucceed {

    exports: IExposed;
    signal: END_SIGNAL.SUCCEED;
    rootReturn: MarkedResultSucceedRootReturn;
}

export interface IMarkedResultTerminated {

    signal: END_SIGNAL.TERMINATED;
    trace: ITrace;
}

export interface IMarkedResultFailed {

    error: MarkedError;
    signal: END_SIGNAL.FAILED;
}

export interface IMarkedResultException {

    signal: END_SIGNAL.EXCEPTION;
    trace: ITrace;
    exception: any;
}

export type MarkedResult =
    | IMarkedResultSucceed
    | IMarkedResultTerminated
    | IMarkedResultFailed
    | IMarkedResultException;
