/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Conditional Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountConditionalExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ConditionalExpression', conditionalExpressionEvaluator);
};

export const conditionalExpressionEvaluator: Evaluator<'ConditionalExpression'> =
    async function (this: Sandbox, node: EST.ConditionalExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const conditional: boolean = await this.execute(node.test, scope, nextTrace);

        return conditional
            ? await this.execute(node.consequent, scope, nextTrace)
            : await this.execute(node.alternate, scope, nextTrace);
    };
