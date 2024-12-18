/**
 * @author WMXPY
 * @namespace Operation
 * @description Update
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";

export const getUpdateOperation
    = (symbol: EST.UpdateOperator)
        : ((value: any) => any) | null => {

        switch (symbol) {

            case "++": return (value: any) => {
                if (typeof value === "number") {
                    return value + 1;
                }
                throw error(ERROR_CODE.POSITIVE_UPDATE_ONLY_AVAILABLE_FOR_VALID_NUMBER, value);
            };
            case "--": return (value: any) => value - 1;
        }

        return null;
    };
