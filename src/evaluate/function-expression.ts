/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
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

        const func = async (thisValue: any, ...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child().initThis();

            if (thisValue instanceof SandClassInstance) {
                subScope.replaceThis(thisValue.combineBody());
            }

            node.params.forEach((pattern: EST.Pattern, index: number) => {

                const identifier: EST.Identifier = pattern as EST.Identifier;
                const value: any = args[index];

                subScope.register(VARIABLE_TYPE.CONSTANT)(identifier.name, value);
            });

            const result: Flag = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {
                return result.getValue();
            }
        };

        const sandFunction: SandFunction = SandFunction.create(func);
        return sandFunction;
    };
