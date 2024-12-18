/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Class Instance
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandClassInstance } from "../../variable/sand-class/sand-class-instance";
import { SandFunction } from "../../variable/sand-function/sand-function";

export const memberExpressionClassInstance = (sandbox: Sandbox, sandClassInstance: SandClassInstance, key: string | number): any => {

    if (typeof key === "string") {

        const target: any = sandClassInstance.lookFor(key);

        if (target instanceof SandFunction) {
            return target.bindThisValue(sandClassInstance);
        }
        return target;
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS_INSTANCE);
};
