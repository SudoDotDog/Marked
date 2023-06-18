/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import { Sandbox } from "../marked/sandbox";
import { ParseESTreeComment } from "../parse/declare";
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

export type MarkedResultSucceedRootReturnHas = {

    hasRootReturn: true;
    returnValue: any;
};

export type MarkedResultSucceedRootReturnNot = {

    hasRootReturn: false;
};

export type MarkedResultSucceedRootReturn =
    | MarkedResultSucceedRootReturnHas
    | MarkedResultSucceedRootReturnNot;

export interface IMarkedResultSucceed {

    exports: IExposed;
    signal: END_SIGNAL.SUCCEED;

    rootReturn: MarkedResultSucceedRootReturn;
    comments: ParseESTreeComment[];

    startTime: number;
    endTime: number;
    duration: number;
}

export interface IMarkedResultTerminated {

    signal: END_SIGNAL.TERMINATED;
    trace: ITrace;
    comments: ParseESTreeComment[];

    startTime: number;
    endTime: number;
    duration: number;
}

export interface IMarkedResultFailed {

    error: MarkedError;
    signal: END_SIGNAL.FAILED;
    comments: ParseESTreeComment[];

    startTime: number;
    endTime: number;
    duration: number;
}

export interface IMarkedResultException {

    signal: END_SIGNAL.EXCEPTION;
    trace: ITrace;
    exception: any;
    comments: ParseESTreeComment[];

    startTime: number;
    endTime: number;
    duration: number;
}

export type MarkedResult =
    | IMarkedResultAborted
    | IMarkedResultSucceed
    | IMarkedResultTerminated
    | IMarkedResultFailed
    | IMarkedResultException;
