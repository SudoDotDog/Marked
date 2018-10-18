/**
 * @author WMXPY
 * @namespace Util
 * @description Operation Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import * as EST from "estree";
import { getAssignmentOperation, getBinaryOperation, getUnaryOperation } from '../../src/util/operation';

describe('Given an Operation utils', (): void => {

    const chance: Chance.Chance = new Chance('util-operations');

    describe('test binary operations', (): void => {

        it('should return correct result', (): void => {

            const left: number = chance.integer({ min: 5, max: 50 });
            const right: number = chance.integer({ min: 5, max: 50 });
            const binaryOperators: EST.BinaryOperator[]
                = ['!=', '!==', '%', '&', '*',
                    '**', '+', '-', '/', '<',
                    '<<', '<=', '==', '===', '>',
                    '>=', '>>', '>>>', '^', 'in',
                    'instanceof', '|'];

            binaryOperators.forEach((operator: EST.BinaryOperator) => {
                const operation: ((left: any, right: any) => any) | null = getBinaryOperation(operator);

                if (operation) {

                    expect(operation(left, right)).to.be.equal(eval(`${left} ${operator} ${right}`));
                } else {

                    // tslint:disable-next-line
                    expect(operation).to.be.null;
                }
            });
        });
    });

    describe('test unary operations', (): void => {

        it('should return correct result', (): void => {

            const element: number = chance.integer({ min: 5, max: 50 });
            const binaryOperators: EST.UnaryOperator[]
                = ['!', '+', '-', 'delete', 'typeof', 'void', '~'];

            binaryOperators.forEach((operator: EST.UnaryOperator) => {
                const operation: ((element: any) => any) | null = getUnaryOperation(operator);

                if (operation) {

                    expect(operation(element)).to.be.equal(eval(`${operator} ${element}`));
                } else {

                    // tslint:disable-next-line
                    expect(operation).to.be.null;
                }
            });
        });
    });

    describe('test assignment operations', (): void => {

        it('should return correct result', (): void => {

            const element: number = chance.integer({ min: 5, max: 50 });
            const binaryOperators: EST.AssignmentOperator[]
                = ['%=', '&=', '**=', '*=', '+=', '-=',
                    '/=', '<<=', '=', '>>=', '>>>=', '^=', '|='];

            binaryOperators.forEach((operator: EST.AssignmentOperator) => {
                const operation: any = getAssignmentOperation(operator);

                if (!operation) {

                     // tslint:disable-next-line
                     expect(operation).to.be.null;
                }
            });
        });
    });
});
