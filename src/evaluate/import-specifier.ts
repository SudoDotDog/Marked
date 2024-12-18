/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Import Specifier
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountImportSpecifier = (sandbox: ISandbox): void => {

    sandbox.mount("ImportSpecifier", importSpecifierEvaluator);
};

export const importSpecifierEvaluator: Evaluator<"ImportSpecifier"> =
    async function (this: Sandbox, node: EST.ImportSpecifier, _scope: Scope, _trace: Trace): Promise<any> {

        const name: string = node.local.name;
        return name;
    };
