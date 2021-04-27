/**
 * @author WMXPY
 * @namespace Util
 * @description Register
 */

import { IScope, ITrace, VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import * as EST from "estree";
import { error } from "./error/error";
import { ERROR_CODE } from "../declare/error";

export const registerScopeVariable = async function (
    this: Sandbox,
    node: EST.Node,
    variableType: VARIABLE_TYPE,
    id: string,
    expression: EST.Expression | null | undefined,
    scope: IScope,
    currentTrace: ITrace,
    nextTrace: ITrace,
): Promise<any> {

    if (scope.exist(id)) {

        throw error(ERROR_CODE.DUPLICATED_VARIABLE, id, node, currentTrace);
    }

    const value: any = expression
        ? await this.execute(expression, scope, nextTrace)
        : undefined;

    scope.register(variableType)(id, value);
    return value;
};
