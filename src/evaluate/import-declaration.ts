/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Import Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { resolveImport } from "../util/import";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountImportDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount('ImportDeclaration', importDeclarationEvaluator);
};

export const importDeclarationEvaluator: Evaluator<'ImportDeclaration'> =
    async function (this: Sandbox, node: EST.ImportDeclaration, scope: Scope, trace: Trace): Promise<any> {

        if (!scope.isExecuteScope()) {
            throw error(ERROR_CODE.IMPORT_ONLY_AVAILABLE_IN_ROOT_SCOPE, void 0, node, trace);
        }

        const nextTrace: Trace = trace.stack(node);

        const source: string = await this.execute(node.source, scope, nextTrace);

        const bindResolveImport = resolveImport.bind(this);
        const result: boolean | Flag = await bindResolveImport(source, node, scope, trace, nextTrace);

        if (result instanceof Flag) {
            return result;
        }

        if (!result) {
            throw error(ERROR_CODE.MODULE_IS_NOT_PROVIDED, source, node, trace);
        }
        return;
    };
