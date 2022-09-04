/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Continue Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountContinueStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ContinueStatement', ContinueStatementEvaluator);
};

export const ContinueStatementEvaluator: Evaluator<'ContinueStatement'> =
    async function (this: Sandbox, node: EST.ContinueStatement, scope: Scope, trace: Trace): Promise<any> {

        if (node.label) {

            throw error(ERROR_CODE.CONTINUE_LABEL_IS_NOT_SUPPORT, node.label.name, node, trace);
        }
        const flag: Flag = Flag.fromContinue(trace);

        return flag;
    };
