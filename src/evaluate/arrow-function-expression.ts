/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Arrow Function Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { registerFunctionExpressionParams } from "../operation/function-expression/params-register";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountArrowFunctionExpression = (sandbox: ISandbox): void => {

    sandbox.mount("ArrowFunctionExpression", arrowFunctionExpressionEvaluator);
};

export const arrowFunctionExpressionEvaluator: Evaluator<"ArrowFunctionExpression"> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope, trace: Trace): Promise<SandFunction> {

        const nextTrace: Trace = trace.stack(node);

        if (node.async) {

            throw error(ERROR_CODE.UNNECESSARY_ASYNC_EXPRESSION, void 0, node, trace);
        }

        const func = async (thisValue: any, ...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child();

            if (thisValue instanceof SandClassInstance) {
                subScope.replaceThis(thisValue.body);
            }

            const bindingRegisterFunctionExpressionParams =
                registerFunctionExpressionParams.bind(this);

            bindingRegisterFunctionExpressionParams(args, node.params, subScope);

            if (node.body.type === "BlockStatement") {

                const result: any = await this.execute(node.body, subScope, nextTrace);
                if (result instanceof Flag) {

                    if (!Boolean(result.getValue.bind(result))) {

                        throw error(
                            ERROR_CODE.UNKNOWN_ERROR,
                            result.getValue(),
                            node,
                            trace,
                        );
                    }
                    if (result.isReturn()) {
                        return result.getValue();
                    }
                    return result;
                }
            } else {

                const result: any = await this.execute(node.body, subScope, nextTrace);
                const flag: Flag = Flag.fromReturn(trace);
                flag.setValue(result || undefined);
                return flag.getValue();
            }
        };

        const sandFunction: SandFunction = SandFunction.create(func);
        return sandFunction;
    };
