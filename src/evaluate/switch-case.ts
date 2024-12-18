/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Switch Case
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountSwitchCase = (sandbox: ISandbox): void => {

    sandbox.mount("SwitchCase", switchCaseEvaluator);
};

export const switchCaseEvaluator: Evaluator<"SwitchCase"> =
    async function (this: Sandbox, node: EST.SwitchCase, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        loop: for (const test of node.consequent) {
            const result: any = await this.execute(test, scope, nextTrace);

            if (result instanceof Flag) {

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
            }
        }

        return;
    };
