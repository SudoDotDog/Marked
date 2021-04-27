/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Module
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { resolveImport } from "../util/import";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const exportsNamedDeclarationEvaluator: Evaluator<'ExportNamedDeclaration'> =
    // eslint-disable-next-line @typescript-eslint/require-await
    async function (this: Sandbox, node: EST.ExportNamedDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        if (node.declaration) { // Node has a declaration

            if (node.declaration.type === 'VariableDeclaration') {

                const type: VARIABLE_TYPE = node.declaration.kind as VARIABLE_TYPE;
                for (const declaration of node.declaration.declarations) {

                    if (declaration.id.type === 'Identifier') {

                        const id: string = declaration.id.name;

                        if (scope.exist(id)) {

                            throw error(ERROR_CODE.DUPLICATED_VARIABLE, id, node, trace);
                        }

                        const value = declaration.init
                            ? await this.execute(declaration.init, scope, nextTrace)
                            : undefined;

                        scope.register(type)(id, value);
                        scope.expose(id, value);
                    } else {

                        throw error(ERROR_CODE.UNDEFINED_TEST_NOT_SUPPORT, declaration.id.type, declaration.id, trace);
                    }
                }
            } else {

                throw error(ERROR_CODE.EXPORT_NAMED_NOT_SUPPORT, node.declaration.type, node, nextTrace);
            }
        } else { // Node have no declaration

            for (const specifier of node.specifiers) {

                const id: string = specifier.exported.name;
                const value: any = await this.execute(specifier.local, scope, nextTrace);

                scope.expose(id, value);
            }
        }
        return;
    };

export const exportsDefaultDeclarationEvaluator: Evaluator<'ExportDefaultDeclaration'> =
    async function (this: Sandbox, node: EST.ExportDefaultDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const content: any = await this.execute(node.declaration, scope, nextTrace);
        if (!(typeof content === 'boolean'
            || typeof content === 'number'
            || typeof content === 'string')) {
            throw error(ERROR_CODE.EXPORT_TYPE_OTHER_THAN_N_S_B_NOT_SUPPORT, typeof content, node, trace);
        }

        scope.exposeDefault(content);
    };

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
