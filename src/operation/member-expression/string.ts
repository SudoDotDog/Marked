/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description String
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";

export const memberExpressionString = (sandbox: Sandbox, target: string, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'includes': {

                return wrapMemberFunction(sandbox, (slice: string) => {
                    return target.includes(slice);
                });
            }
            case 'length': {

                return target.length;
            }
            case 'replace': {

                return wrapMemberFunction(
                    sandbox,
                    (searchValue: string, replaceValue: string) => {
                        return target.replace(searchValue, replaceValue);
                    },
                );
            }
            case 'toString': {

                return wrapMemberFunction(sandbox, () => {
                    return target.toString();
                });
            }
        }
    }

    if (typeof key === 'number') {

        return target[key];
    }

    throw error(ERROR_CODE.STRING_METHOD_NOT_FOUND);
};
