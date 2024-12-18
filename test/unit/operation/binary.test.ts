/**
 * @author WMXPY
 * @namespace Operation
 * @description Binary
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { getBinaryOperation } from "../../../src/operation/binary-expression/operators";

describe("Given Binary Operation", (): void => {

    const chance: Chance.Chance = new Chance("operations-binary");

    it("should return correct result", (): void => {

        const left: number = chance.integer({ min: 5, max: 50 });
        const right: number = chance.integer({ min: 5, max: 50 });
        const binaryOperators: EST.BinaryOperator[]
            = ["!=", "!==", "%", "&", "*",
                "**", "+", "-", "/", "<",
                "<<", "<=", "==", "===", ">",
                ">=", ">>", ">>>", "^", "|"];

        binaryOperators.forEach((operator: EST.BinaryOperator) => {
            const operation: ((leftArg: any, rightArg: any) => any) | null = getBinaryOperation(operator);

            if (operation) {
                expect(operation(left, right)).toEqual(eval(`${left} ${operator} ${right}`));
            } else {
                expect(operation).toBeNull();
            }
        });
    });
});
