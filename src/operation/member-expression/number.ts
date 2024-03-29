/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Number
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";

export const memberExpressionNumber = (sandbox: Sandbox, target: number, key: string | number): any => {

    if (typeof key === "string") {

        switch (key) {

            case "toFixed": {

                return wrapMemberFunction(sandbox, (digits: number) => {
                    return target.toFixed(digits);
                });
            }
            case "toPrecision": {

                return wrapMemberFunction(sandbox, (precision: number) => {
                    return target.toPrecision(precision);
                });
            }
            case "toString": {

                return wrapMemberFunction(sandbox, () => {
                    return target.toString();
                });
            }
        }
    }

    throw error(ERROR_CODE.NUMBER_METHOD_NOT_FOUND);
};
