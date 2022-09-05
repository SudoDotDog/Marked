/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable Declaration
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { declareVariableStack } from "../operation/variable-declaration/declare-variable-stack";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountVariableDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount('VariableDeclaration', variableDeclarationEvaluator);
};

export const variableDeclarationEvaluator: Evaluator<'VariableDeclaration'> =
    async function (this: Sandbox, node: EST.VariableDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const bindDeclareVariableStack = declareVariableStack.bind(this);
        await bindDeclareVariableStack(node, scope, trace, nextTrace);
    };
