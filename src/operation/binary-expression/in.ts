/**
 * @author WMXPY
 * @namespace Operation_BinaryExpression
 * @description In
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { IScope, ITrace } from "../../declare/variable";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandClass } from "../../variable/sand-class/sand-class";
import { SandClassInstance } from "../../variable/sand-class/sand-class-instance";
import { SandMap } from "../../variable/sand-map";

export const executeInBinaryOperator = async function (
    this: Sandbox,
    left: any,
    right: any,
    scope: IScope,
    trace: ITrace,
): Promise<any> {

    const assertedLeft: EST.Identifier = left as EST.Identifier;
    if (assertedLeft.type !== 'Identifier') {

        throw error(
            ERROR_CODE.IN_BINARY_OPERATION_ONLY_ALLOW_ON_IDENTIFIER,
            String(left),
            undefined,
            trace,
        );
    }

    const inOperationRight: any = await this.execute(right, scope, trace);

    if (inOperationRight instanceof SandMap) {

        return inOperationRight.has(assertedLeft.name);
    }

    if (inOperationRight instanceof SandClass) {

        return inOperationRight.staticBody.has(assertedLeft.name);
    }

    if (inOperationRight instanceof SandClassInstance) {

        return inOperationRight.lookForHas(assertedLeft.name);
    }

    throw error(
        ERROR_CODE.IN_BINARY_OPERATION_ONLY_ALLOW_ON_MAP_OR_CLASS,
        String(inOperationRight),
        undefined,
        trace,
    );
};
