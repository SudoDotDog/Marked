/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Class
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandClass } from "../../variable/sand-class/sand-class";
import { SandFunction } from "../../variable/sand-function/sand-function";

export const memberExpressionClass = (sandbox: Sandbox, sandClass: SandClass, key: string | number): any => {

    if (typeof key === "string") {

        if (sandClass.staticBody.has(key)) {

            const target: any = sandClass.staticBody.get(key);

            if (target instanceof SandFunction) {
                return target.bindThisValue(sandClass);
            }
            return target;
        }

        switch (key) {

            case "name": {
                return sandClass.className;
            }
        }
        return undefined;
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS);
};
