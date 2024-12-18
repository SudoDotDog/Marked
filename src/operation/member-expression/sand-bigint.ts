/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand BigInt
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";
import { SandLiteralBigInt } from "../../variable/sand-literal/bigint";

export const memberExpressionSandBigInt = (sandbox: Sandbox, bigint: SandLiteralBigInt, key: string | number): any => {

    switch (key) {

        case "toString": {

            return wrapMemberFunction(sandbox, () => {
                return bigint.toNativeBigInt().toString();
            });
        }
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_BIGINT);
};
