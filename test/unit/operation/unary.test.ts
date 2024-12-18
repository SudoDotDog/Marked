/**
 * @author WMXPY
 * @namespace Operation
 * @description Unary
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { getUnaryOperation } from '../../../src/operation/unary';

describe('Given Unary Operation', (): void => {

    const chance: Chance.Chance = new Chance('operation-unary');

    it('should be able to return correct result', (): void => {

        const element: number = chance.integer({ min: 5, max: 50 });
        const binaryOperators: EST.UnaryOperator[]
            = ['!', '+', '-', 'delete', 'typeof', 'void', '~'];

        binaryOperators.forEach((operator: EST.UnaryOperator) => {
            const operation: ((elementArg: any) => any) | null = getUnaryOperation(operator);

            if (operation) {

                // eslint-disable-next-line no-eval
                expect(operation(element)).toEqual(eval(`${operator} ${element}`));
            } else {
                expect(operation).toBeNull();
            }
        });
    });
});
