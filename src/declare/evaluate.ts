/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import { Sandbox } from "../marked/sandbox";
import { ParseESTreeComment } from "../parse/parse-estree";
import { MarkedError } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { EST_TYPE, IESTreeType } from "./types";
import { IExposed, ITrace } from "./variable";

export type Evaluator<T extends EST_TYPE> =
    (this: Sandbox, node: IESTreeType[T], scope: Scope, trace: Trace) => Promise<any>;

export enum END_SIGNAL {

    ABORTED = "ABORTED",
    SUCCEED = "SUCCEED",
    TERMINATED = "TERMINATED",
    FAILED = "FAILED",
    EXCEPTION = "EXCEPTION",
}

export interface IMarkedResultAborted {

    error: MarkedError;
    signal: END_SIGNAL.ABORTED;
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
    comments: ParseESTreeComment[];
}

export interface IMarkedResultTerminated {

    signal: END_SIGNAL.TERMINATED;
    trace: ITrace;
    comments: ParseESTreeComment[];
}

export interface IMarkedResultFailed {

    error: MarkedError;
    signal: END_SIGNAL.FAILED;
    comments: ParseESTreeComment[];
}

export interface IMarkedResultException {

    signal: END_SIGNAL.EXCEPTION;
    trace: ITrace;
    exception: any;
    comments: ParseESTreeComment[];
}

export type MarkedResult =
    | IMarkedResultAborted
    | IMarkedResultSucceed
    | IMarkedResultTerminated
    | IMarkedResultFailed
    | IMarkedResultException;
