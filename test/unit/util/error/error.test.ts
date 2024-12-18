/**
 * @author WMXPY
 * @namespace Util
 * @description Error Test
 */


import { ERROR_CODE } from '../../../../src/declare/error-code';
import { error } from '../../../../src/util/error/error';

describe('Given an <Error> function', (): void => {

    describe('test error generators', (): void => {

        it('error a error code should return target error', (): void => {

            const result = error(ERROR_CODE.UNKNOWN_ERROR);
            expect(result.message).toEqual('1000: Unknown error');
        });

        it('a returned arrow should be throwable', (): void => {

            const result = error(ERROR_CODE.INTERNAL_ERROR);
            const throwThis = () => {
                throw result;
            };
            expect(throwThis).toThrow("9001: Internal error");
        });
    });
});
