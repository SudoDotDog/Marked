/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand Function
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandFunction } from "../../variable/sand-function/sand-function";

export const memberExpressionSandFunction = (target: SandFunction, key: string | number): any => {

    switch (key) {

        case 'toString': {
            return () => {
                return '[Marked Function]';
            };
        }
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_BIGINT);
};
