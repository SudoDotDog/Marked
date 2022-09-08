/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Tagged Template Expression
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

export const mountTaggedTemplateExpression = (sandbox: ISandbox): void => {

    sandbox.mount('TaggedTemplateExpression', taggedTemplateExpressionEvaluator);
};

export const taggedTemplateExpressionEvaluator: Evaluator<'TaggedTemplateExpression'> =
    async function (this: Sandbox, node: EST.TaggedTemplateExpression, scope: Scope, trace: Trace): Promise<any> {

        console.log(node);

        return;
    };
