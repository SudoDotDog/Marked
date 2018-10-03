/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const expressionEvaluator: Evaluator<'ExpressionStatement'> = async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope): Promise<any> {
    return await this.execute(node.expression, scope);
};

export const calleeEvaluator: Evaluator<'CallExpression'> = async function (this: Sandbox, node: EST.CallExpression, scope: Scope): Promise<any> {
    const func: () => any = await this.execute(node.callee, scope);
    const args = [];
    for (const arg of node.arguments) {
        args.push(await this.execute(arg, scope));
    }
    return func.apply(null, args);
};
