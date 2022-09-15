/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand List
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandFunction } from "../../variable/sand-function/sand-function";
import { SandList } from "../../variable/sand-list";

export const GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL = Symbol('GET_ARRAY_MEMBER_NOT_FOUND');

export const memberExpressionSandList = (list: SandList<any>, key: string): any => {

    switch (key) {

        case 'length': {

            return list.length;
        }
        case 'map': {
            return async (func: ((element: any, index: number) => any) | SandFunction) => {

                if (!(func instanceof SandFunction)
                    && typeof func !== 'function') {
                    throw error(ERROR_CODE.LIST_MAP_ARGUMENT_SHOULD_BE_A_FUNCTION);
                }

                const sandFunction: SandFunction = SandFunction.wrapFunction(func);

                const result: any[] = [];
                for (let i = 0; i < list.length; i++) {

                    const currentResult: any =
                        await Promise.resolve(sandFunction.execute(list.get(i), i));
                    result.push(currentResult);
                }
                return result;
            };
        }
        case 'filter': {

            return async (func: ((element: any, index: number) => Promise<boolean>) | SandFunction) => {

                if (!(func instanceof SandFunction)
                    && typeof func !== 'function') {
                    throw error(ERROR_CODE.LIST_FILTER_ARGUMENT_SHOULD_BE_A_FUNCTION);
                }

                const sandFunction: SandFunction = SandFunction.wrapFunction(func);

                const result: any[] = [];
                for (let i = 0; i < list.length; i++) {

                    const currentResult: boolean =
                        await Promise.resolve(sandFunction.execute(list.get(i), i));

                    if (currentResult) {
                        result.push(list.get(i));
                    }
                }
                return result;
            };
        }
    }
    return GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL;
};
