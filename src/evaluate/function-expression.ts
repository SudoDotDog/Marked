/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { registerFunctionExpressionParams } from "../operation/function-expression/params-register";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountFunctionExpression = (sandbox: ISandbox): void => {

    sandbox.mount('FunctionExpression', functionExpressionEvaluator);
};

export const functionExpressionEvaluator: Evaluator<'FunctionExpression'> =
    async function (this: Sandbox, node: EST.FunctionExpression, scope: Scope, trace: Trace): Promise<SandFunction> {

        const nextTrace: Trace = trace.stack(node);

        if (node.async) {

            throw error(ERROR_CODE.UNNECESSARY_ASYNC_EXPRESSION, void 0, node, trace);
        }

        const func = async (thisValue: any, ...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child().initThis();

            if (thisValue instanceof SandClass) {
                subScope.replaceThis(thisValue.staticBody);
            }

            if (thisValue instanceof SandClassInstance) {
                subScope.replaceThis(thisValue.body);
            }

            const bindingRegisterFunctionExpressionParams =
                registerFunctionExpressionParams.bind(this);

            bindingRegisterFunctionExpressionParams(args, node.params, subScope);

            const result: Flag = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {
                return result.getValue();
            }
        };

        const sandFunction: SandFunction = SandFunction.create(func);
        return sandFunction;
    };
