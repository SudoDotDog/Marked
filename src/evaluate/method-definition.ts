/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Method Definition
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { TraceClass } from "../variable/trace/trace-class";

export const mountMethodDefinition = (sandbox: ISandbox): void => {

    sandbox.mount('MethodDefinition', methodDefinitionEvaluation);
};

export const methodDefinitionEvaluation: Evaluator<'MethodDefinition'> =
    async function (this: Sandbox, node: EST.MethodDefinition, scope: Scope, trace: Trace): Promise<boolean> {

        if (!(trace instanceof TraceClass)) {
            throw error(ERROR_CODE.TRACE_SHOULD_BE_CLASS_TRACE, void 0, node, trace);
        }

        if (node.key.type !== 'Identifier') {
            throw error(ERROR_CODE.PROPERTY_SHOULD_BE_IDENTIFIER, "Key", node, trace);
        }

        const key: string = node.key.name;
        const value: any = await this.execute(node.value as any, scope, trace);

        trace.sandClass.body.set(key, value);

        return true;
    };
