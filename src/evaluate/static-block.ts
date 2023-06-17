/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Static Block
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountStaticBlock = (sandbox: ISandbox): void => {

    sandbox.mount('StaticBlock', staticBlockEvaluation);
};

export const staticBlockEvaluation: Evaluator<'StaticBlock'> =
    async function (this: Sandbox, node: EST.StaticBlock, scope: Scope, trace: Trace): Promise<void> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        for (const statement of node.body) {

            console.log(statement);
            await this.execute(statement, subScope, nextTrace);
        }
    };