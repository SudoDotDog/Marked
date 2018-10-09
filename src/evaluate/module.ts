/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Module
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { error } from "marked#util/error/error";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "sandbox";

export const exportsNamedDeclarationEvaluator: Evaluator<'ExportNamedDeclaration'> =
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

        if (scope.hasParent()) throw error(ERROR_CODE.IMPORT_ONLY_AVAILABLE_IN_ROOT_SCOPE, void 0, node, trace);
        const nextTrace: Trace = trace.stack(node);

        const source: string = await this.execute(node.source, scope, nextTrace);
        const mod: any | null = this.module(source);
        if (!Boolean(mod)) throw error(ERROR_CODE.MODULE_IS_NOT_PROVIDED, source, node, trace);
        if (node.specifiers.length !== 1) throw error(ERROR_CODE.UNKNOWN_ERROR, source, node, trace);

        const target = await this.execute(node.specifiers[0], scope, nextTrace);
        scope.register(VARIABLE_TYPE.CONSTANT)(target, mod);
        return;
    };

export const importDefaultSpecifierEvaluator: Evaluator<'ImportDefaultSpecifier'> =
    async function (this: Sandbox, node: EST.ImportDefaultSpecifier, scope: Scope, trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };
