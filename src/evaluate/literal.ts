/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Literal
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountLiteral = (sandbox: ISandbox): void => {

    sandbox.mount('Literal', literalEvaluator);
};

export const literalEvaluator: Evaluator<'Literal'> =
    async function (this: Sandbox, node: EST.Literal, _scope: Scope, _trace: Trace): Promise<any> {

        return node.value;
    };
