/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const programEvaluator: Evaluator<'Program'> = async function (this: Sandbox, node: EST.Program, scope: Scope) {
    console.log(this, node, scope);
    for (const child of node.body) await this.execute(child, scope);
};
