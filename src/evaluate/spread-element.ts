/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Spread Element
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountSpreadElement = (sandbox: ISandbox): void => {

    sandbox.mount('SpreadElement', spreadElementEvaluator);
};

export const spreadElementEvaluator: Evaluator<'SpreadElement'> =
    async function (this: Sandbox, _node: EST.SpreadElement, _scope: Scope, _trace: Trace): Promise<any> {

        return null;
    };
