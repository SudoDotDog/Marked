/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Break Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountBreakStatement = (sandbox: ISandbox): void => {

    sandbox.mount('BreakStatement', breakStatementEvaluator);
};

export const breakStatementEvaluator: Evaluator<'BreakStatement'> =
    async function (this: Sandbox, node: EST.BreakStatement, _scope: Scope, trace: Trace): Promise<any> {

        const flag: Flag = Flag.fromBreak(trace);

        if (node.label) {
            flag.setValue(node.label.name);
        }
        return flag;
    };
