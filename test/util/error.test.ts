/**
 * @author WMXPY
 * @namespace Util
 * @description Error Test
 */

require('../../src/binding');
import { expect } from 'chai';
import { error, ERROR_CODE } from 'marked#util/error';

describe('Given an <Error> function', (): void => {

    describe('test error generators', (): void => {

        it('error a error code should return target error', (): void => {

            const result = error(ERROR_CODE.UNKNOWN_ERROR);
            expect(result.message).to.be.equal('1000: Unknown error');
        });

        it('a returned arrow should be throwable', (): void => {

            const result = error(ERROR_CODE.INTERNAL_ERROR);
            const throwThis = () => {
                throw result;
            };
            expect(throwThis).to.be.throw("9001: Internal error");
        });
    });
});
