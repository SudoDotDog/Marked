/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Template Literal
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountTemplateLiteral = (sandbox: ISandbox): void => {

    sandbox.mount("TemplateLiteral", templateLiteralEvaluator);
};

export const templateLiteralEvaluator: Evaluator<"TemplateLiteral"> =
    async function (this: Sandbox, node: EST.TemplateLiteral, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const restQuasis: EST.TemplateElement[] = [...node.quasis];
        const restExpressions: EST.Expression[] = [...node.expressions];

        const result: string[] = [];

        while (restQuasis.length > 0) {

            const quasi: EST.TemplateElement = restQuasis.shift() as EST.TemplateElement;

            result.push(String(quasi.value.cooked));

            if (!quasi.tail) {

                const expression: EST.Expression = restExpressions.shift() as EST.Expression;

                const expressionResult: any = await this.execute(expression, scope, nextTrace);

                result.push(String(expressionResult));
            }
        }
        return result.join("");
    };
