/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Class Body
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { TraceClass } from "../variable/trace/trace-class";

export const mountClassBody = (sandbox: ISandbox): void => {

    sandbox.mount('ClassBody', classBodyEvaluation);
};

export const classBodyEvaluation: Evaluator<'ClassBody'> =
    async function (this: Sandbox, node: EST.ClassBody, scope: Scope, trace: Trace): Promise<any> {

        if (!(trace instanceof TraceClass)) {

            throw error(ERROR_CODE.TRACE_SHOULD_BE_CLASS_TRACE, void 0, node, trace);
        }

        for (const item of node.body) {
            await this.execute(item, scope, trace);
        }
        return true;
    };
