/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Sequence Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { assert } from "../util/error/assert";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountSequenceExpression = (sandbox: ISandbox): void => {

    sandbox.mount('SequenceExpression', sequenceExpressionEvaluator);
};

export const sequenceExpressionEvaluator: Evaluator<'SequenceExpression'> =
    async function (this: Sandbox, node: EST.SequenceExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const returnStatement: EST.Node
            = assert(node.expressions.pop() as EST.Node).is.exist().firstValue();
        for (const statement of node.expressions) {

            await this.execute(statement, scope, nextTrace);
        }
        const result: any = await this.execute(returnStatement, scope, nextTrace);

        return result;
    };
