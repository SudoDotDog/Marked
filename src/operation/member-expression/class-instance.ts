/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Class Instance
 */

import { ERROR_CODE } from "../../declare/error";
import { error } from "../../util/error/error";
import { SandClassInstance } from "../../variable/sand-class/sand-class-instance";

export const memberExpressionClassInstance = (sandClassInstance: SandClassInstance, key: string | number): any => {

    if (typeof key === 'string') {

        return sandClassInstance.body.get(key);
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS_INSTANCE);
};
