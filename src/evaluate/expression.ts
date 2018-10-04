/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { Flag } from "marked#variable/flag";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const expressionEvaluator: Evaluator<'ExpressionStatement'> =
    async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope): Promise<any> {

        return await this.execute(node.expression, scope);
    };

export const calleeEvaluator: Evaluator<'CallExpression'> =
    async function (this: Sandbox, node: EST.CallExpression, scope: Scope): Promise<any> {

        const func: () => any = await this.execute(node.callee, scope);
        const args = [];
        for (const arg of node.arguments) {
            args.push(await this.execute(arg, scope));
        }

        return func.apply(null, args);
    };

export const arrowFunctionEvaluator: Evaluator<'ArrowFunctionExpression'> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope): Promise<any> {

        const func = async (...args: any[]): Promise<any> => {

            const subScope = Scope.fromScope(scope);
            for (let i = 0; i < node.params.length; i++) {
                const pattern: EST.Identifier = node.params[i] as EST.Identifier;
                const value: any = args[i];

                subScope.register(VARIABLE_TYPE.CONSTANT)(pattern.name, value);
            }
            const result: Flag = await this.execute(node.body, subScope);
            if (result) {
                return result.getValue();
            }
        };
        return func;
    };
