/**
 * @author WMXPY
 * @namespace Evaluate
 * @description This Expression
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountThisExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ThisExpression', thisExpressionEvaluator);
};

export const thisExpressionEvaluator: Evaluator<'ThisExpression'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.ThisExpression, scope: Scope, trace: Trace): Promise<SandMap<any>> {

        console.log('ThisExpression', node, scope, trace);

        const thisValue: SandMap<any> = scope.findThis();
        return thisValue;
    };
