/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Program
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountProgram = (sandbox: ISandbox): void => {

    sandbox.mount("Program", programEvaluator);
};

export const programEvaluator: Evaluator<"Program"> =
    async function (this: Sandbox, node: EST.Program, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        for (const child of node.body) {

            const result: any = await this.execute(child, scope, nextTrace);
            if (result instanceof Flag) {

                if (result.isRootReturn()) {
                    return result;
                }
                if (result.isFatal()) {
                    return result;
                }
                if (result.isThrow()) {
                    return result;
                }
            }
        }

        return;
    };
