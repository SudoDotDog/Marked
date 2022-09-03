/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Class
 */

import { ERROR_CODE } from "../../declare/error";
import { error } from "../../util/error/error";
import { SandClass } from "../../variable/sand-class/sand-class";

export const memberExpressionClass = (sandClass: SandClass, key: string | number): any => {

    if (typeof key === 'string') {

        switch (key) {

            case 'name':
                return sandClass.className;
        }

        return undefined;
    }

    throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS);
};
