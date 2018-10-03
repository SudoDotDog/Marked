/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import { Scope } from "marked#variable/scope";

export enum EXPRESSION_TYPE {
    PROGRAM = "Program",
}

export type EVALUATE_FUNC<T> = (expr: T, scope: Scope) => any;
