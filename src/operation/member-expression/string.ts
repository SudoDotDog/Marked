/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description String
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";

export const memberExpressionString = (target: string, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'length': {
                return target.length;
            }
        }
    }

    if (typeof key === 'number') {

        return target[key];
    }

    throw error(ERROR_CODE.STRING_METHOD_NOT_FOUND);
};
