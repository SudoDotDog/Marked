/**
 * @author WMXPY
 * @namespace Operation
 * @description Assignment
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { getAssignmentOperation } from '../../../src/operation/assignment';

describe('Given Assignment Operation', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('operations-assignment');

    it('should return correct result', (): void => {

        const binaryOperators: EST.AssignmentOperator[]
            = ['%=', '&=', '**=', '*=', '+=', '-=',
                '/=', '<<=', '=', '>>=', '>>>=', '^=', '|='];

        binaryOperators.forEach((operator: EST.AssignmentOperator) => {
            const operation: any = getAssignmentOperation(operator);

            if (!operation) {
                expect(operation).toBeNull();
            }
        });
    });
});
