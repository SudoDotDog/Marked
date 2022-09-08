/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Number
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";

export const memberExpressionNumber = (target: number, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'toString': {
                return () => {
                    target.toString();
                };
            }
        }
    }

    throw error(ERROR_CODE.NUMBER_METHOD_NOT_FOUND);
};
