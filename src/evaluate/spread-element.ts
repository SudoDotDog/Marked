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
    async function (this: Sandbox, node: EST.SpreadElement, scope: Scope, trace: Trace): Promise<any> {

        const argumentValue: any = await this.execute(node.argument, scope, trace);

        return argumentValue;
    };
