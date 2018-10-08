/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import * as EST from "estree";
import { IESTreeType } from "marked#declare/types";
import { IExposed } from "marked#declare/variable";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "../sandbox";

export type EST_TYPE = EST.Node['type'];

export type Evaluator<T extends EST_TYPE> = (this: Sandbox, node: IESTreeType[T], scope: Scope, trace: Trace) => Promise<any>;

export enum END_SIGNAL {
    SUCCEED = 0,
    FAILED = 1,
}

export interface IMarkedResult {
    exports: IExposed;
    signal: END_SIGNAL;
}
