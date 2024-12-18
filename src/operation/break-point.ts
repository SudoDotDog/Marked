/**
 * @author WMXPY
 * @namespace Operation
 * @description Break Point
 */

import * as EST from "estree";
import { MarkedDebugFlowController } from "../debug/flow-controller";
import { MarkedDebugInterceptor } from "../debug/interceptor";
import { MarkedDebugSnapshot } from "../debug/snapshot/snapshot";
import { ERROR_CODE } from "../declare/error-code";
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

    const sourceCode: string | null = this.getSourceCode(trace.scriptLocation);

    if (typeof sourceCode !== "string") {

        throw error(
            ERROR_CODE.INTERNAL_ERROR,
            `Cannot find source code for ${trace.scriptLocation.hash()}`,
            node,
            trace,
        );
    }

    const snapshot: MarkedDebugSnapshot = MarkedDebugSnapshot.fromScopeAndNode(
        sourceCode,
        scope,
        node,
        trace,
    );

    const flowController: MarkedDebugFlowController = MarkedDebugFlowController.fromOptions({
        continueMethod: () => {
            pauseResolver();
        },
        terminateMethod: () => {
            this.breakWithFlag(Flag.fromTerminate(trace));
            pauseResolver();
        },
        nextStepMethod: () => {
            this.setNextStep(true);
            pauseResolver();
        },
    });

    interceptor.execute(snapshot, flowController);

    await pausePromise;
};
