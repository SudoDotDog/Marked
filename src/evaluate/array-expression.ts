/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Array Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { SandList } from "../variable/sand-list";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountArrayExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ArrayExpression', arrayExpressionEvaluator);
};

export const arrayExpressionEvaluator: Evaluator<'ArrayExpression'> =
    async function (this: Sandbox, node: EST.ArrayExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const mapped: any[] = [];
        for (const element of node.elements) {

            if (element !== null) {

                const evaluated: any = await this.execute(element, scope, nextTrace);

                if (element.type === "SpreadElement") {
                    if (!(evaluated instanceof SandList)) {
                        throw error(ERROR_CODE.CANNOT_SPREAD_OTHER_THAN_ARRAY, typeof evaluated, element, nextTrace);
                    } else {
                        mapped.push(...evaluated.list);
                    }
                } else {
                    mapped.push(evaluated);
                }
            }
        }
        return new SandList(mapped);
    };
