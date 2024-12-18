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
import { SandFunction } from "../variable/sand-function/sand-function";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountTaggedTemplateExpression = (sandbox: ISandbox): void => {

    sandbox.mount("TaggedTemplateExpression", taggedTemplateExpressionEvaluator);
};

export const taggedTemplateExpressionEvaluator: Evaluator<"TaggedTemplateExpression"> =
    async function (this: Sandbox, node: EST.TaggedTemplateExpression, scope: Scope, trace: Trace): Promise<any> {

        const target: SandFunction | ((...callArgs: any[]) => any) = await this.execute(node.tag, scope, trace);

        if (typeof target === "undefined") {

            throw error(
                ERROR_CODE.CANNOT_CALL_TAGGED_TEMPLATE_EXPRESSION_OF_UNDEFINED,
                undefined,
                node,
                trace,
            );
        }

        const templateElements: string[] = [];
        for (const element of node.quasi.quasis) {
            templateElements.push(element.value.raw);
        }

        const expressions: any[] = [];
        for (const expression of node.quasi.expressions) {
            const result: any = await this.execute(expression, scope, trace);
            expressions.push(result);
        }

        const args: any[] = [
            templateElements,
            ...expressions,
        ];


        if (!(target instanceof SandFunction)) {
            if (this.usingAdditionalArgument) {
                args.unshift(this.additionalArgument);
            }
        }

        if (target instanceof SandFunction) {
            return await target.execute(...args);
        }

        if (typeof target === "function") {
            return await Promise.resolve(target(...args));
        }
    };
