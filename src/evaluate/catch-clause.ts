/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Catch clause
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { Variable } from "../variable/variable";

export const mountCatchClause = (sandbox: ISandbox): void => {

    sandbox.mount("CatchClause", CatchClauseEvaluator);
};

export const CatchClauseEvaluator: Evaluator<"CatchClause"> =
    async function (this: Sandbox, node: EST.CatchClause, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const identifier: EST.Identifier = node.param as EST.Identifier;

        const throwObject: Variable<any> | null = scope.getThrow();
        if (!(throwObject instanceof Variable)) {
            throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
        }

        const registerer = subScope.register(VARIABLE_TYPE.CONSTANT);
        registerer(identifier.name, throwObject.get());

        const result: any = await this.execute(node.body, subScope, nextTrace);
        return result;
    };
