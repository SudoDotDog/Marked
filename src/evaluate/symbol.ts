/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const programEvaluator: Evaluator<'Program'> =
    async function (this: Sandbox, node: EST.Program, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        for (const child of node.body) {

            const result: any = await this.execute(child, scope, nextTrace);
            if (result instanceof Flag) {
                if (result.isThrow()) {
                    return result;
                }
            }
        }

        return;
    };

export const returnEvaluator: Evaluator<'ReturnStatement'> =
    async function (this: Sandbox, node: EST.ReturnStatement, scope: Scope, trace: Trace): Promise<Flag> {

        const nextTrace: Trace = trace.stack(node);

        const flag: Flag = Flag.fromReturn(trace);
        if (node.argument) {

            const value: any = await this.execute(node.argument, scope, nextTrace);
            flag.setValue(value);
        }

        return flag;
    };
