/**
 * @author WMXPY
 * @namespace Operation
 * @description Binary
 * @override Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { getBinaryOperation } from '../../../src/operation/binary-expression/operators';

describe('Given Binary Operation', (): void => {

    const chance: Chance.Chance = new Chance('operations-binary');

    it('should return correct result', (): void => {

        const left: number = chance.integer({ min: 5, max: 50 });
        const right: number = chance.integer({ min: 5, max: 50 });
        const binaryOperators: EST.BinaryOperator[]
            = ['!=', '!==', '%', '&', '*',
                '**', '+', '-', '/', '<',
                '<<', '<=', '==', '===', '>',
                '>=', '>>', '>>>', '^',
                'instanceof', '|'];

        binaryOperators.forEach((operator: EST.BinaryOperator) => {
            const operation: ((leftArg: any, rightArg: any) => any) | null = getBinaryOperation(operator);

            if (operation) {

                // eslint-disable-next-line no-eval
                expect(operation(left, right)).to.be.equal(eval(`${left} ${operator} ${right}`));
            } else {
                expect(operation).to.be.null;
            }
        });
    });
});
