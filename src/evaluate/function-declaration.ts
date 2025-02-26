/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { functionExpressionEvaluator } from "./function-expression";

export const mountFunctionDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount("FunctionDeclaration", functionDeclarationEvaluator);
};

export const functionDeclarationEvaluator: Evaluator<"FunctionDeclaration"> =
    async function (this: Sandbox, node: EST.FunctionDeclaration, scope: Scope, trace: Trace): Promise<SandFunction> {

        const nextTrace: Trace = trace.stack(node);

        const func: SandFunction
            = await functionExpressionEvaluator.bind(this)(node as any, scope, nextTrace);

        if (!node.id) {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        if (node.id.type !== "Identifier") {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        if (typeof node.id.name !== "string") {
            throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        }

        const rawName: string = node.id.name;

        const registerer = scope.register(VARIABLE_TYPE.CONSTANT);
        registerer(rawName, func);

        return func;
    };
