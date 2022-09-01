/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Empty Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";

export const mountEmptyStatement = (sandbox: Sandbox): void => {

    sandbox.mount('EmptyStatement', emptyStatementEvaluator);
};

export const emptyStatementEvaluator: Evaluator<'EmptyStatement'> =
    async function (this: Sandbox, _node: EST.EmptyStatement, _scope: Scope, _trace: Trace): Promise<any> {

        return null;
    };
