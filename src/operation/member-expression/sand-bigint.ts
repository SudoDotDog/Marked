/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand BigInt
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandLiteralBigInt } from "../../variable/sand-literal/bigint";

export const memberExpressionSandBigInt = (bigint: SandLiteralBigInt, key: string | number): any => {

    switch (key) {

        case 'toString': {
            return () => {
                return bigint.toNativeBigInt().toString();
            };
        }
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_BIGINT);
};
