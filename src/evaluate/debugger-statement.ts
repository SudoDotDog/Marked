/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Debugger Statement
 */

import * as EST from "estree";
import { MarkedDebugFlowController } from "../debug/flow-controller";
import { MarkedDebugInterceptor } from "../debug/interceptor";
import { MarkedDebugSnapshot } from "../debug/snapshot/snapshot";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountDebuggerStatement = (sandbox: ISandbox): void => {

    sandbox.mount('DebuggerStatement', debuggerStatementEvaluator);
};

export const debuggerStatementEvaluator: Evaluator<'DebuggerStatement'> =
    async function (this: Sandbox, node: EST.DebuggerStatement, scope: Scope, trace: Trace): Promise<any> {

        if (!this.hasDebugInterceptor()) {
            throw error(ERROR_CODE.DEBUGGER_WITHOUT_DEBUG_INTERCEPTOR, void 0, node, trace);
        }

        let pauseResolver: () => void;
        const pausePromise: Promise<void> = new Promise((resolve: () => void) => {
            pauseResolver = resolve;
        });

        const interceptor: MarkedDebugInterceptor = this.ensureGetDebugInterceptor();

        const snapshot: MarkedDebugSnapshot = MarkedDebugSnapshot.fromScope(scope);
        const flowController: MarkedDebugFlowController = MarkedDebugFlowController.fromMethods(
            () => {
                if (typeof pauseResolver !== 'function') {
                    throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
                this.recoverFromBreak();
                pauseResolver();
            },
            () => {
                this.breakWithFlag(Flag.fromTerminate(trace));
                pauseResolver();
            },
        );

        interceptor.execute(snapshot, flowController);

        await pausePromise;
        return null;
    };
