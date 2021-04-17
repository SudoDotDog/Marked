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
import { SandMap } from "../variable/sandmap";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const exportsNamedDeclarationEvaluator: Evaluator<'ExportNamedDeclaration'> =
    // eslint-disable-next-line @typescript-eslint/require-await
    async function (this: Sandbox, node: EST.ExportNamedDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        throw error(ERROR_CODE.EXPORT_NAMED_NOT_SUPPORT, void 0, node, nextTrace);
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

        this.expose('default', content);
    };

export const importDeclarationEvaluator: Evaluator<'ImportDeclaration'> =
    async function (this: Sandbox, node: EST.ImportDeclaration, scope: Scope, trace: Trace): Promise<any> {

        if (scope.hasParent()) {
            throw error(ERROR_CODE.IMPORT_ONLY_AVAILABLE_IN_ROOT_SCOPE, void 0, node, trace);
        }

        const nextTrace: Trace = trace.stack(node);

        const source: string = await this.execute(node.source, scope, nextTrace);
        const targetModule: any | null = this.module(source);

        if (!Boolean(targetModule)) {
            throw error(ERROR_CODE.MODULE_IS_NOT_PROVIDED, source, node, trace);
        }

        for (const specifier of node.specifiers) {

            const target: any = await this.execute(specifier, scope, nextTrace);
            const register: (name: string, value: any) => void = scope.register(VARIABLE_TYPE.CONSTANT);

            switch (specifier.type) {

                case 'ImportDefaultSpecifier': {

                    if (!(typeof targetModule === 'object' && Boolean(targetModule.default))) {
                        throw error(ERROR_CODE.IMPORT_DEFAULT_OBJECT_HAVE_NO_DEFAULT_EXPORT, target, node, trace);
                    }

                    register(target, targetModule.default);
                    break;
                }
                case 'ImportNamespaceSpecifier': {

                    if (!(typeof targetModule === 'object')) {
                        throw error(ERROR_CODE.IMPORT_OBJECT_NOT_FOUND, target, node, trace);
                    }

                    const map: SandMap<any> = new SandMap(targetModule);
                    register(target, map);
                    break;
                }
                case 'ImportSpecifier': {

                    const imported: string = specifier.imported.name;
                    if (!Boolean(targetModule[imported])) {
                        throw error(ERROR_CODE.IMPORT_OBJECT_NOT_FOUND, imported, node, trace);
                    }

                    register(target, targetModule[imported]);
                    break;
                }
                default: {

                    throw error(ERROR_CODE.UNKNOWN_ERROR, (specifier as any).type, node, trace);
                }
            }
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
