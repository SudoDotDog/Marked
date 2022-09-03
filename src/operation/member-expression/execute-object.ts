/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Execute Object
 */

import * as EST from "estree";
import { Sandbox } from "../../marked/sandbox";
import { Scope } from "../../variable/scope";
import { Trace } from "../../variable/trace/trace";

export const executeMemberExpressionObject = async function (
    this: Sandbox,
    node: EST.Expression | EST.Super,
    scope: Scope,
    trace: Trace,
): Promise<any> {

    return this.execute(node, scope, trace);
};
