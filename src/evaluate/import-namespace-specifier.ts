/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Import Namespace Specifier
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountImportNamespaceSpecifier = (sandbox: ISandbox): void => {

    sandbox.mount('ImportNamespaceSpecifier', importNamespaceSpecifierEvaluator);
};

export const importNamespaceSpecifierEvaluator: Evaluator<'ImportNamespaceSpecifier'> =
    async function (this: Sandbox, node: EST.ImportNamespaceSpecifier, _scope: Scope, _trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };
