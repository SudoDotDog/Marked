/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Module
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { error } from "marked#util/error/error";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "sandbox";

export const exportsNamedDeclarationEvaluator: Evaluator<'ExportNamedDeclaration'> =
    async function (this: Sandbox, node: EST.ExportNamedDeclaration, scope: Scope, trace: Trace): Promise<any> {

        throw error(ERROR_CODE.EXPORT_NAMED_NOT_SUPPORT, void 0, node, trace);
    };

export const exportsDefaultDeclarationEvaluator: Evaluator<'ExportDefaultDeclaration'> =
    async function (this: Sandbox, node: EST.ExportDefaultDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const content = await this.execute(node.declaration, scope, trace);
        this.expose('default', content);
    };
