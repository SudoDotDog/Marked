/**
 * @author WMXPY
 * @namespace Operation
 * @description Break Point
 */

import { MarkedDebugFlowController } from "../debug/flow-controller";
import { MarkedDebugInterceptor } from "../debug/interceptor";
import { MarkedDebugSnapshot } from "../debug/snapshot/snapshot";
import { ERROR_CODE } from "../declare/error-code";
import * as EST from "estree";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const pauseForBreakPoint = async function (this: Sandbox, node: EST.Node, scope: Scope, trace: Trace): Promise<void> {

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
                throw error(ERROR_CODE.INTERNAL_ERROR, void 0, null as any, trace);
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
};
