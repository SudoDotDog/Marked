/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Boolean
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";

export const memberExpressionBoolean = (target: boolean, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'toString': {
                return () => {
                    target.toString();
                };
            }
        }
    }

    throw error(ERROR_CODE.BOOLEAN_METHOD_NOT_FOUND);
};
