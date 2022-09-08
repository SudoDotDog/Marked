/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Export Default Declaration
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountExportDefaultDeclaration = (sandbox: ISandbox): void => {

    sandbox.mount('ExportDefaultDeclaration', exportDefaultDeclarationEvaluator);
};

export const exportDefaultDeclarationEvaluator: Evaluator<'ExportDefaultDeclaration'> =
    async function (this: Sandbox, node: EST.ExportDefaultDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const content: any = await this.execute(node.declaration, scope, nextTrace);
        scope.exposeDefault(content, trace);
    };
