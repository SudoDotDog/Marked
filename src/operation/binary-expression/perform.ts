/**
 * @author WMXPY
 * @namespace Operation_BinaryExpression
 * @description Perform
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandLiteralBigInt } from "../../variable/sand-literal/bigint";

export const createPerformBinaryExpressionOnNumberOrString = (
    action: (left: any, right: any) => any,
) => {
    return (left: any, right: any): any => {
        return performBinaryExpressionOnNumberOrString(left, right, action);
    };
};

export const performBinaryExpressionOnNumberOrString = (
    left: any,
    right: any,
    action: (left: any, right: any) => any,
): number | string | SandLiteralBigInt => {

    if (left instanceof SandLiteralBigInt
        || right instanceof SandLiteralBigInt) {

        const result: bigint = action(
            SandLiteralBigInt.resolve(left),
            SandLiteralBigInt.resolve(right),
        );

        return SandLiteralBigInt.create(result.toString());
    }

    return action(left, right);
};

export const createPerformBinaryExpressionOnNumber = (
    action: (left: any, right: any) => any,
) => {
    return (left: any, right: any): any => {
        return performBinaryExpressionOnNumber(left, right, action);
    };
};

export const performBinaryExpressionOnNumber = (
    left: any,
    right: any,
    action: (left: any, right: any) => any,
): number | SandLiteralBigInt => {

    if (left instanceof SandLiteralBigInt
        || right instanceof SandLiteralBigInt) {

        const result: bigint = action(
            SandLiteralBigInt.resolve(left),
            SandLiteralBigInt.resolve(right),
        );

        return SandLiteralBigInt.create(result.toString());
    }

    if (typeof left !== "number"
        || typeof right !== "number") {
        throw error(ERROR_CODE.CANNOT_PERFORM_ACTION_ON_NON_NUMBER, `${left} & ${right}`);
    }

    return action(left, right);
};
