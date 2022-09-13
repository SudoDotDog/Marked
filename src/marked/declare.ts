/**
 * @author WMXPY
 * @namespace Marked
 * @description Declare
 */

import * as EST from "estree";
import { MarkedResult } from "../declare/evaluate";
import { IExecuter } from "../declare/sandbox";
import { BaseSourceMapLocationFinder } from "../source-map/location-finder/base";

export type ParseScriptResult = {

    readonly locationFinder: BaseSourceMapLocationFinder;
    readonly estree: EST.Node;
};

export enum EVALUATE_RESOURCE_END_SIGNAL {

    SUCCEED = "SUCCEED",
    EVALUATE_FAILED = "EVALUATE_FAILED",
    CYCLED_IMPORT = "CYCLED_IMPORT",
}

export type EvaluateResourceSucceedResult = {

    readonly signal: EVALUATE_RESOURCE_END_SIGNAL.SUCCEED;
    readonly executer: IExecuter;
};

export type EvaluateResourceEvaluateFailedResult = {

    readonly signal: EVALUATE_RESOURCE_END_SIGNAL.EVALUATE_FAILED;
    readonly result: MarkedResult;
};

export type EvaluateResourceCycledImportResult = {

    readonly signal: EVALUATE_RESOURCE_END_SIGNAL.CYCLED_IMPORT;
};

export type EvaluateResourceResult =
    | EvaluateResourceSucceedResult
    | EvaluateResourceEvaluateFailedResult
    | EvaluateResourceCycledImportResult;
