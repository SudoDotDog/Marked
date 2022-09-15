/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Class
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandClass } from "../../variable/sand-class/sand-class";

export const memberExpressionClass = (sandbox: Sandbox, sandClass: SandClass, key: string | number): any => {

    if (typeof key === 'string') {

        if (sandClass.staticBody.has(key)) {
            return sandClass.staticBody.get(key);
        }

        switch (key) {
            case 'name': return sandClass.className;
        }
        return undefined;
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS);
};
