/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const programEvaluator: Evaluator<'Program'> = async function (this: Sandbox, node: EST.Program, scope: Scope): Promise<any> {
    for (const child of node.body) await this.execute(child, scope);
};

export const identifierEvaluator: Evaluator<'Identifier'> = async function (this: Sandbox, node: EST.Identifier, scope: Scope): Promise<any> {
    return console.log;
};

export const literalEvaluator: Evaluator<'Literal'> = async function (this: Sandbox, node: EST.Literal, scope: Scope): Promise<any> {
    return node.value;
};
