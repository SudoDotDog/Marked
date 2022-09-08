/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Try Statement
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

export const mountTryStatement = (sandbox: ISandbox): void => {

    sandbox.mount('TryStatement', TryStatementEvaluator);
};

export const TryStatementEvaluator: Evaluator<'TryStatement'> =
    async function (this: Sandbox, node: EST.TryStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const result: any = await this.execute(node.block, subScope, nextTrace);

        const beforeExit = async (): Promise<any> => {

            if (!node.finalizer) {
                return;
            }

            const finallyResult: any = await this.execute(node.finalizer, scope, trace);
            return finallyResult;
        };

        if (result instanceof Flag) {

            if (result.isThrow()) {

                if (!node.handler) {
                    throw error(ERROR_CODE.CATCH_NOT_FOUND, void 0, node, trace);
                }

                this.recoverFromBreak();

                const catchScope: Scope = scope.child();
                catchScope.setThrow(result.getValue());
                const catchResult: any = await this.execute(node.handler, catchScope, trace);

                const catchFinallyResult: any = await beforeExit();

                if (catchFinallyResult instanceof Flag) {
                    return catchFinallyResult;
                }
                return catchResult;
            }
        }

        const passedFinallyResult: any = await beforeExit();
        if (passedFinallyResult instanceof Flag) {
            return passedFinallyResult;
        }
        return result;
    };
