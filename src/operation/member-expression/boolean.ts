/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Boolean
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";

export const memberExpressionBoolean = (sandbox: Sandbox, target: boolean, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'toString': {

                return wrapMemberFunction(sandbox, () => {
                    return target.toString();
                });
            }
        }
    }

    throw error(ERROR_CODE.BOOLEAN_METHOD_NOT_FOUND);
};
