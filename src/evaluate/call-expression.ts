/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Callee Evaluator
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { SandFunction } from "../variable/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountCallExpression = (sandbox: ISandbox): void => {

    sandbox.mount('CallExpression', callExpressionEvaluator);
};

export const callExpressionEvaluator: Evaluator<'CallExpression'> =
    async function (this: Sandbox, node: EST.CallExpression, scope: Scope, trace: Trace): Promise<any> {

        console.log('call expression', node);

        const nextTrace: Trace = trace.stack(node);

        const func: SandFunction | (() => any) =
            await this.execute(node.callee, scope, nextTrace);

        if (typeof func === 'undefined') {

            const calleeNode: EST.MemberExpression = node.callee as EST.MemberExpression;
            const callee: EST.Identifier = calleeNode.property as EST.Identifier;
            throw error(ERROR_CODE.CANNOT_CALL_MEMBER_FUNCTION_OF_UNDEFINED, callee.name, node, trace);
        }

        const args: any[] = [];
        for (const arg of node.arguments) {
            args.push(await this.execute(arg, scope, nextTrace));
        }

        if (!(func instanceof SandFunction)) {
            if (this.usingAdditionalArgument) {
                args.unshift(this.additionalArgument);
            }
        }

        const settledFunction: () => any =
            func instanceof SandFunction
                ? func.function
                : func;

        if (node.callee.type === 'MemberExpression') {

            const object: any = await this.execute(node.callee.object, scope, nextTrace);
            const result: any = settledFunction.apply(object, args as any);
            return result;
        } else {

            // eslint-disable-next-line prefer-spread
            const result: any = settledFunction.apply(null, args as any);
            return result;
        }
    };
