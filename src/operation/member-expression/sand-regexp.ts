/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand RegExp
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";
import { SandLiteralRegExp } from "../../variable/sand-literal/regexp";

export const memberExpressionSandRegExp = (sandbox: Sandbox, regexp: SandLiteralRegExp, key: string | number): any => {

    switch (key) {

        case 'test': {
            return wrapMemberFunction(sandbox, (target: string) => {
                return regexp.toNativeRegExp().test(target);
            });
        }
        case 'toString': {
            return wrapMemberFunction(sandbox, () => {
                return regexp.toString();
            });
        }
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_REGEXP);
};
