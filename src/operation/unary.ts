/**
 * @author WMXPY
 * @namespace Operation
 * @description Unary
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";

export const getUnaryOperation = (
    symbol: EST.UnaryOperator,
): ((value: any) => any) | null => {

    switch (symbol) {

        case "!": return (value: any) => !Boolean(value);
        case "+": return null;
        case "-": return (value: any) => {
            if (typeof value === "number" && !isNaN(value)) {
                return value * -1;
            }
            throw error(ERROR_CODE.NEGATIVE_UNARY_ONLY_AVAILABLE_FOR_VALID_NUMBER, symbol);
        };
        case "delete": return null;
        case "typeof": return (value: any) => {
            if (value === null) {
                return "null";
            }
            if (value instanceof SandClass) {
                return "class";
            }
            if (value instanceof SandClassInstance) {
                return "class-instance";
            }
            if (value instanceof SandFunction) {
                return "function";
            }
            if (value instanceof SandList) {
                return "array";
            }
            if (value instanceof SandMap) {
                return "object";
            }
            return typeof value;
        };
        case "void": return () => undefined;
        case "~": return null;
    }

    return null;
};
