/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Import Default Specifier
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountImportDefaultSpecifier = (sandbox: ISandbox): void => {

    sandbox.mount('ImportDefaultSpecifier', importDefaultSpecifierEvaluator);
};

export const importDefaultSpecifierEvaluator: Evaluator<'ImportDefaultSpecifier'> =
    async function (this: Sandbox, node: EST.ImportDefaultSpecifier, _scope: Scope, _trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };
