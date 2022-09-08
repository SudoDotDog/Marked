/**
 * @author WMXPY
 * @namespace Evaluate
 * @description If Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountIfStatement = (sandbox: ISandbox): void => {

    sandbox.mount('IfStatement', ifStatementEvaluator);
};

export const ifStatementEvaluator: Evaluator<'IfStatement'> =
    async function (this: Sandbox, node: EST.IfStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const statement: boolean = Boolean(await this.execute(node.test, scope, nextTrace));
        if (statement) {

            return await this.execute(node.consequent, subScope, nextTrace);
        } else {

            if (node.alternate) {

                return await this.execute(node.alternate, subScope, nextTrace);
            }
        }
        return;
    };
