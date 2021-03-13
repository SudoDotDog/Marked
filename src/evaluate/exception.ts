/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Exception
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/node";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const tryEvaluator: Evaluator<'TryStatement'> =
    async function (this: Sandbox, node: EST.TryStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const result: any = await this.execute(node.block, subScope, nextTrace);

        if (result instanceof Flag) {

            if (result.isThrow()) {

                if (!node.handler) {
                    throw error(ERROR_CODE.CATCH_NOT_FOUND, void 0, node, trace);
                }
                const catchResult: any = await this.execute(node.handler, scope, trace);
                return catchResult;
            }
        }
        return result;
    };

export const throwEvaluator: Evaluator<'ThrowStatement'> =
    async function (this: Sandbox, node: EST.ThrowStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const result: any = await this.execute(node.argument, subScope, nextTrace);
        const flag: Flag = Flag.fromThrow();
        flag.setValue(result);

        return flag;
    };
