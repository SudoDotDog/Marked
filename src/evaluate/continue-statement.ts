/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Continue Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountContinueStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ContinueStatement', ContinueStatementEvaluator);
};

export const ContinueStatementEvaluator: Evaluator<'ContinueStatement'> =
    async function (this: Sandbox, node: EST.ContinueStatement, _scope: Scope, trace: Trace): Promise<any> {

        const flag: Flag = Flag.fromContinue(trace);

        if (node.label) {
            flag.setValue(node.label.name);
        }
        return flag;
    };
