/**
 * @author WMXPY
 * @namespace Operation_FunctionExpression
 * @description Params Register
 */

import * as EST from "estree";
import { VARIABLE_TYPE } from "../../declare/variable";
import { Sandbox } from "../../marked/sandbox";
import { Scope } from "../../variable/scope";

export function registerFunctionExpressionParams(
    this: Sandbox,
    args: any[],
    params: EST.Pattern[],
    scope: Scope,
): void {

    loop: for (let i = 0; i < params.length; i++) {

        const pattern: EST.Pattern = params[i];
        const index: number = i;

        const registerer = scope.register(VARIABLE_TYPE.CONSTANT);

        if (pattern.type === "Identifier") {

            const value: any = args[index];
            registerer(pattern.name, value);
        } else if (pattern.type === "RestElement") {

            const identifier: EST.Identifier = pattern.argument as EST.Identifier;
            const value: any = args.slice(index);

            registerer(identifier.name, value);
            break loop;
        }
    }
}
