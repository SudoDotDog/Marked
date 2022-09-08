/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand RegExp
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandLiteralRegExp } from "../../variable/sand-literal/regexp";

export const memberExpressionSandRegExp = (regexp: SandLiteralRegExp, key: string | number): any => {

    switch (key) {

        case 'test': {
            return (target: string) => {
                return regexp.toNativeRegExp().test(target);
            };
        }
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_REGEXP);
};
