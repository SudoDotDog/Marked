/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Module
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { DeclareVariableElement } from "../operation/variable-declaration/declare";
import { declareVariableStack } from "../operation/variable-declaration/declare-variable-stack";
import { error } from "../util/error/error";
import { resolveImport } from "../util/import";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const importDeclarationEvaluator: Evaluator<'ImportDeclaration'> =
    async function (this: Sandbox, node: EST.ImportDeclaration, scope: Scope, trace: Trace): Promise<any> {

        if (scope.hasParent()) {
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

export const importDefaultSpecifierEvaluator: Evaluator<'ImportDefaultSpecifier'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.ImportDefaultSpecifier, scope: Scope, trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };

export const importNamespaceSpecifierEvaluator: Evaluator<'ImportNamespaceSpecifier'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.ImportNamespaceSpecifier, scope: Scope, trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };

export const importSpecifierEvaluator: Evaluator<'ImportSpecifier'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.ImportSpecifier, scope: Scope, trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };
