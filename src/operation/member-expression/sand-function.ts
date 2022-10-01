/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand Function
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";
import { SandFunction } from "../../variable/sand-function/sand-function";

export const memberExpressionSandFunction = (sandbox: Sandbox, target: SandFunction, key: string | number): any => {

    switch (key) {

        case "toString": {

            return wrapMemberFunction(sandbox, () => {
                return "[Marked Function]";
            });
        }
    }

    throw error(ERROR_CODE.FUNCTION_METHOD_NOT_FOUND);
};
