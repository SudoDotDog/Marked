/**
 * @author WMXPY
 * @namespace Operation_BinaryExpression
 * @description Instance Of
 */

import { ERROR_CODE } from "../../declare/error-code";
import { IScope, ITrace } from "../../declare/variable";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandClass } from "../../variable/sand-class/sand-class";
import { SandClassInstance } from "../../variable/sand-class/sand-class-instance";

export const executeInstanceOfBinaryOperator = async function (
    this: Sandbox,
    left: any,
    right: any,
    scope: IScope,
    trace: ITrace,
): Promise<any> {

    const operatorLeft: any = await this.execute(left, scope, trace);
    if (!(operatorLeft instanceof SandClassInstance)) {

        throw error(
            ERROR_CODE.INSTANCE_OF_BINARY_OPERATION_LEFT_ONLY_ALLOW_ON_CLASS_INSTANCE,
            String(operatorLeft),
            left,
            trace,
        );
    }

    const operationRight: any = await this.execute(right, scope, trace);
    if (!(operationRight instanceof SandClass)) {

        throw error(
            ERROR_CODE.INSTANCE_OF_BINARY_OPERATION_RIGHT_ONLY_ALLOW_ON_CLASS,
            String(operationRight),
            right,
            trace,
        );
    }

    return operatorLeft.targetClass.sameClass(operationRight);
};
