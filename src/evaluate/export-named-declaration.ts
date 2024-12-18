/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Export Named Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { DeclareVariableElement } from "../operation/variable-declaration/declare";
import { declareVariableStack } from "../operation/variable-declaration/declare-variable-stack";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountExportNamedDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount("ExportNamedDeclaration", exportNamedDeclarationEvaluator);
};

export const exportNamedDeclarationEvaluator: Evaluator<"ExportNamedDeclaration"> =
    async function (this: Sandbox, node: EST.ExportNamedDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        if (node.declaration) { // Node has a declaration

            if (node.declaration.type === "VariableDeclaration") {

                const bindDeclareVariableStack = declareVariableStack.bind(this);
                const declareResults: DeclareVariableElement[] = await bindDeclareVariableStack(node.declaration, scope, trace, nextTrace);

                for (const result of declareResults) {
                    scope.expose(result.id, result.value, trace);
                }
            } else {

                throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, node.declaration.type, node, nextTrace);
            }
        } else { // Node have no declaration

            for (const specifier of node.specifiers) {

                const id: string = specifier.exported.name;
                const value: any = await this.execute(specifier.local, scope, nextTrace);

                scope.expose(id, value, trace);
            }
        }
        return;
    };
