/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Return Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountReturnStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ReturnStatement', returnStatementEvaluator);
};

export const returnStatementEvaluator: Evaluator<'ReturnStatement'> =
    async function (this: Sandbox, node: EST.ReturnStatement, scope: Scope, trace: Trace): Promise<Flag> {

        const nextTrace: Trace = trace.stack(node);

        const traceNode: EST.Node | null = trace.getNode();
        if (traceNode !== null && traceNode.type === 'Program') {

            const rootReturnFlag = Flag.fromRootReturn(trace);

            if (node.argument) {
                const value: any = await this.execute(node.argument, scope, nextTrace);
                rootReturnFlag.setValue(value);
            }
            return rootReturnFlag;
        }

        const flag: Flag = Flag.fromReturn(trace);
        if (node.argument) {

            const value: any = await this.execute(node.argument, scope, nextTrace);
            flag.setValue(value);
        }

        return flag;
    };
