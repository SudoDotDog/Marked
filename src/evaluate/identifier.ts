/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Identifier
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { Variable } from "../variable/variable";

export const mountIdentifier = (sandbox: ISandbox): void => {

    sandbox.mount('Identifier', identifierEvaluator);
};

export const identifierEvaluator: Evaluator<'Identifier'> =
    async function (this: Sandbox, node: EST.Identifier, scope: Scope, trace: Trace): Promise<any> {

        if (node.name === 'undefined') {
            return undefined;
        }

        const variable: Variable<any> | null = scope.rummage(node.name);
        if (variable) {
            return variable.get();
        }

        throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.name, node, trace);
    };
