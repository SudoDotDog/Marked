/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Arrow Function Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { SandFunction } from "../variable/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const mountArrowFunctionExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ArrowFunctionExpression', arrowFunctionExpressionEvaluator);
};

export const arrowFunctionExpressionEvaluator: Evaluator<'ArrowFunctionExpression'> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope, trace: Trace): Promise<SandFunction> {

        const nextTrace: Trace = trace.stack(node);

        const func = async (...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child();

            node.params.forEach((pattern: EST.Pattern, index: number) => {
                const identifier: EST.Identifier = pattern as EST.Identifier;
                const value: any = args[index];

                subScope.register(VARIABLE_TYPE.CONSTANT)(identifier.name, value);
            });

            if (node.body.type === 'BlockStatement') {

                const result: Flag = await this.execute(node.body, subScope, nextTrace);
                if (result) {

                    if (!Boolean(result.getValue.bind(result))) {
                        throw error(ERROR_CODE.UNKNOWN_ERROR, result.toString(), node, trace);
                    }
                    return result.getValue();
                }
            } else {

                const result: any = await this.execute(node.body, subScope, nextTrace);
                const flag: Flag = Flag.fromReturn(trace);
                flag.setValue(result || undefined);
                return flag.getValue();
            }
        };

        const sandFunction: SandFunction = new SandFunction(func);
        return sandFunction;
    };
