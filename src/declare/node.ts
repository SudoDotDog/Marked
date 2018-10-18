/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import * as EST from "estree";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";
import { IESTreeType } from "./types";
import { IExposed } from "./variable";

export type EST_TYPE = EST.Node['type'];

export type Evaluator<T extends EST_TYPE> =
    (this: Sandbox, node: IESTreeType[T], scope: Scope, trace: Trace) => Promise<any>;

export enum END_SIGNAL {

    SUCCEED = 0,
    FAILED = 1,
}

export interface IMarkedResult {

    exports: IExposed;
    signal: END_SIGNAL;
}
