/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const switchCaseEvaluator: Evaluator<'SwitchCase'> =
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

export const switchExpressionEvaluator: Evaluator<'SwitchStatement'> =
    async function (this: Sandbox, node: EST.SwitchStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const discriminant: any = await this.execute(node.discriminant, scope, nextTrace);
        loop: for (const test of node.cases) {

            if (!test.test) {

                throw error(ERROR_CODE.UNDEFINED_TEST_NOT_SUPPORT);
            }
            const match: any = await this.execute(test.test, subScope, nextTrace);

            if (match === discriminant) {

                const result: any = await this.execute(test, subScope, nextTrace);

                if (result instanceof Flag) {

                    if (result.isBreak()) { break loop; }
                    else if (result.isReturn()) { return result; }
                    else if (result.isContinue()) { continue loop; }
                    else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
                }
            }
        }

        return;
    };
