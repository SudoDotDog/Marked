/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Await Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountAwaitExpression = (sandbox: ISandbox): void => {

    sandbox.mount('AwaitExpression', awaitExpressionEvaluator);
};

export const awaitExpressionEvaluator: Evaluator<'AwaitExpression'> =
    async function (this: Sandbox, node: EST.AwaitExpression, scope: Scope, trace: Trace): Promise<any> {

        throw error(ERROR_CODE.UNNECESSARY_AWAIT_EXPRESSION, void 0, node, trace);
    };
