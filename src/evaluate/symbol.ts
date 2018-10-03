/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { Marked } from "marked";
import { Evaluator } from "marked#declare/node";
import { Scope } from "marked#variable/scope";

export const programEvaluator: Evaluator<'Program'> = async function (this: Marked, node: EST.Program, scope: Scope) {
    console.log(this, node, scope);
    for (const child of node.body) await this.execute(child, scope);
};
