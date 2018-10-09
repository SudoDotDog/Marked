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

        const content: any = await this.execute(node.declaration, scope, trace);

        if (!(typeof content === 'boolean'
            || typeof content === 'number'
            || typeof content === 'string')) {
            throw error(ERROR_CODE.EXPORT_TYPE_OTHER_THAN_N_S_B_NOT_SUPPORT, typeof content, node, trace);
        }

        this.expose('default', content);
    };
