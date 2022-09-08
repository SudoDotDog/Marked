/**
 * @author WMXPY
 * @namespace Evaluate
 * @description While Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { LimitCounter } from "../util/node/context";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountWhileStatement = (sandbox: ISandbox): void => {

    sandbox.mount('WhileStatement', whileStatementEvaluator);
};

export const whileStatementEvaluator: Evaluator<'WhileStatement'> =
    async function (this: Sandbox, node: EST.WhileStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxWhileLoopLimit'));
        const test: () => Promise<boolean>
            = async () => await this.execute(node.test, scope, nextTrace);

        loop: while (await test()) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_WHILE_LOOP_LIMITED_EXCEED, void 0, node, trace);
            }

            const subScope: Scope = scope.child();
            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
            }
        }

        return;
    };
