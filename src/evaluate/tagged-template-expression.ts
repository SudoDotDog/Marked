/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Tagged Template Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountTaggedTemplateExpression = (sandbox: ISandbox): void => {

    sandbox.mount('TaggedTemplateExpression', taggedTemplateExpressionEvaluator);
};

export const taggedTemplateExpressionEvaluator: Evaluator<'TaggedTemplateExpression'> =
    async function (this: Sandbox, node: EST.TaggedTemplateExpression, scope: Scope, trace: Trace): Promise<any> {

        console.log(JSON.stringify(node, null, 2));

        return;
    };
