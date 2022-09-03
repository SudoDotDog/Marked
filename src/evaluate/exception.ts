/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Exception
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const tryEvaluator: Evaluator<'TryStatement'> =
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

export const catchEvaluator: Evaluator<'CatchClause'> =
    async function (this: Sandbox, node: EST.CatchClause, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const identifier: EST.Identifier = node.param as EST.Identifier;
        subScope.register(VARIABLE_TYPE.CONSTANT)(identifier.name, scope.getThrow());

        const result: any = await this.execute(node.body, subScope, nextTrace);
        return result;
    };

export const throwEvaluator: Evaluator<'ThrowStatement'> =
    async function (this: Sandbox, node: EST.ThrowStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const result: any = await this.execute(node.argument, subScope, nextTrace);
        const flag: Flag = Flag.fromThrow(trace);
        flag.setValue(result);

        return flag;
    };
