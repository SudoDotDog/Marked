/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Block Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountBlockStatement = (sandbox: ISandbox): void => {

    sandbox.mount('BlockStatement', blockStatementEvaluator);
};

export const blockStatementEvaluator: Evaluator<'BlockStatement'> =
    async function (this: Sandbox, node: EST.BlockStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();
        for (const child of node.body) {

            const result: Flag = await this.execute(child, subScope, nextTrace);
            if (result instanceof Flag) {
                return result;
            }
        }

        return;
    };
