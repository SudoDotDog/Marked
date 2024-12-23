/**
 * @author WMXPY
 * @namespace Operation_MemberExpression
 * @description Sand List
 */

import { ERROR_CODE } from "../../declare/error-code";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { wrapMemberFunction } from "../../util/wrap-member-function";
import { SandFunction } from "../../variable/sand-function/sand-function";
import { SandList } from "../../variable/sand-list";

export const GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL = Symbol("GET_ARRAY_MEMBER_NOT_FOUND");

export const memberExpressionSandList = (sandbox: Sandbox, list: SandList<any>, key: string): any => {

    switch (key) {

        case "filter": {

            return wrapMemberFunction(sandbox, async (func: ((element: any, index: number) => Promise<boolean>) | SandFunction) => {

                if (!(func instanceof SandFunction)
                    && typeof func !== "function") {
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
            });
        }
        case "forEach": {

            return wrapMemberFunction(sandbox, async (func: ((element: any, index: number) => Promise<void>) | SandFunction) => {

                if (!(func instanceof SandFunction)
                    && typeof func !== "function") {
                    throw error(ERROR_CODE.LIST_FOR_EACH_ARGUMENT_SHOULD_BE_A_FUNCTION);
                }

                const sandFunction: SandFunction = SandFunction.wrapFunction(func);

                for (let i = 0; i < list.length; i++) {

                    await Promise.resolve(sandFunction.execute(list.get(i), i));
                }
                return;
            });
        }
        case "length": {

            return list.length;
        }
        case "map": {

            return wrapMemberFunction(sandbox, async (func: ((element: any, index: number) => any) | SandFunction) => {

                if (!(func instanceof SandFunction)
                    && typeof func !== "function") {
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
            });
        }
    }
    return GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL;
};
