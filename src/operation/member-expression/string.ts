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

            case 'concat': {

                return wrapMemberFunction(sandbox, (...args: any[]) => {
                    return target.concat(...args);
                });
            }
            case 'endWith': {

                return wrapMemberFunction(sandbox, (slice: string) => {
                    return target.endsWith(slice);
                });
            }
            case 'includes': {

                return wrapMemberFunction(sandbox, (slice: string) => {
                    return target.includes(slice);
                });
            }
            case 'length': {

                return target.length;
            }
            case 'padEnd': {

                return wrapMemberFunction(sandbox, (length: number, fillString: string) => {
                    return target.padEnd(length, fillString);
                });
            }
            case 'padStart': {

                return wrapMemberFunction(sandbox, (length: number, fillString: string) => {
                    return target.padStart(length, fillString);
                });
            }
            case 'repeat': {

                return wrapMemberFunction(sandbox, (count: number) => {
                    return target.repeat(count);
                });
            }
            case 'replace': {

                return wrapMemberFunction(sandbox, (searchValue: string, replaceValue: string) => {
                    return target.replace(searchValue, replaceValue);
                });
            }
            case 'split': {

                return wrapMemberFunction(sandbox, (separator: string) => {
                    return target.split(separator);
                });
            }
            case 'startWith': {

                return wrapMemberFunction(sandbox, (slice: string) => {
                    return target.startsWith(slice);
                });
            }
            case 'toLowerCase': {

                return wrapMemberFunction(sandbox, () => {
                    return target.toLowerCase();
                });
            }
            case 'toString': {

                return wrapMemberFunction(sandbox, () => {
                    return target.toString();
                });
            }
            case 'toUpperCase': {

                return wrapMemberFunction(sandbox, () => {
                    return target.toUpperCase();
                });
            }
        }
    }

    if (typeof key === 'number') {

        return target.charAt(key);
    }

    throw error(ERROR_CODE.STRING_METHOD_NOT_FOUND);
};
