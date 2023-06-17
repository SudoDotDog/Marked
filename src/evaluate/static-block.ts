/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Static Block
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

export const mountStaticBlock = (sandbox: ISandbox): void => {

    sandbox.mount('StaticBlock', staticBlockEvaluation);
};

export const staticBlockEvaluation: Evaluator<'StaticBlock'> =
    async function (this: Sandbox, node: EST.StaticBlock, scope: Scope, trace: Trace): Promise<void> {

        if (!(trace instanceof TraceClass)) {

            throw error(ERROR_CODE.TRACE_SHOULD_BE_CLASS_TRACE, void 0, node, trace);
        }

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        subScope.replaceThis(trace.sandClass.staticBody);

        for (const statement of node.body) {

            await this.execute(statement, subScope, nextTrace);
        }
    };
