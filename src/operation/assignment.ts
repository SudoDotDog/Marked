/**
 * @author WMXPY
 * @namespace Operation
 * @description Assignment
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { error } from "../util/error/error";
import { Variable } from "../variable/variable";

export const getAssignmentOperation
    = (symbol: EST.AssignmentOperator)
        : ((variable: Variable<any>, value: any) => any) | null => {

        switch (symbol) {

            case "%=": return null;
            case "&=": return null;
            case "**=": return null;
            case "*=": return (variable: Variable<any>, value: any) => variable.set(variable.get() * value);
             
            case "+=": return (variable: Variable<any>, value: any) => variable.set(variable.get() + value);
            case "-=": return (variable: Variable<any>, value: any) => variable.set(variable.get() - value);
            case "/=": return (variable: Variable<any>, value: any) => {
                if (value === 0) {
                    throw error(ERROR_CODE.CANNOT_DIVIDE_BY_ZERO, symbol);
                }
                return variable.set(variable.get() / value);
            };
            case "<<=": return null;
            case "=": return (variable: Variable<any>, value: any) => variable.set(value);
            case ">>=": return null;
            case ">>>=": return null;
            case "^=": return null;
            case "|=": return null;
        }

        return null;
    };
