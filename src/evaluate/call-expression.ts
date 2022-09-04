/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Callee Evaluator
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountCallExpression = (sandbox: ISandbox): void => {

    sandbox.mount('CallExpression', callExpressionEvaluator);
};

export const callExpressionEvaluator: Evaluator<'CallExpression'> =
    async function (this: Sandbox, node: EST.CallExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const func: SandFunction | ((...callArgs: any[]) => any) =
            await this.execute(node.callee, scope, nextTrace);

        if (typeof func === 'undefined') {

            const calleeNode: EST.MemberExpression = node.callee as EST.MemberExpression;
            const callee: EST.Identifier = calleeNode.property as EST.Identifier;
            throw error(ERROR_CODE.CANNOT_CALL_MEMBER_FUNCTION_OF_UNDEFINED, callee.name, node, trace);
        }

        const args: any[] = [];
        for (const arg of node.arguments) {

            const argument: any = await this.execute(arg, scope, nextTrace);
            if (argument instanceof Flag) {
                return;
            }
            args.push(argument);
        }

        if (!(func instanceof SandFunction)) {
            if (this.usingAdditionalArgument) {
                args.unshift(this.additionalArgument);
            }
        }

        if (func instanceof SandFunction) {
            return await func.execute(...args);
        }

        if (typeof func === 'function') {
            return await func(...args);
        }
    };
