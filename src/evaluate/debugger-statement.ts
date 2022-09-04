/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Debugger Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountDebuggerStatement = (sandbox: ISandbox): void => {

    sandbox.mount('DebuggerStatement', debuggerStatementEvaluator);
};

export const debuggerStatementEvaluator: Evaluator<'DebuggerStatement'> =
    async function (this: Sandbox, node: EST.DebuggerStatement, scope: Scope, trace: Trace): Promise<any> {

        console.log('Debugger Statement', node, scope, trace);

        if (!this.hasDebugInterceptor()) {
            throw error(ERROR_CODE.DEBUGGER_WITHOUT_DEBUG_INTERCEPTOR, void 0, node, trace);
        }

        return null;
    };
