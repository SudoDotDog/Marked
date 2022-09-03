/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Throw Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountThrowStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ThrowStatement', throwStatementEvaluator);
};

export const throwStatementEvaluator: Evaluator<'ThrowStatement'> =
    async function (this: Sandbox, node: EST.ThrowStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const result: any = await this.execute(node.argument, subScope, nextTrace);
        const flag: Flag = Flag.fromThrow(trace);
        flag.setValue(result);

        this.breakWithFlag(flag);

        return flag;
    };
