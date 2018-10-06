/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Test
 */


require('../../src/binding');
import { expect } from 'chai';
import { ERROR_CODE } from 'marked#declare/error';
import { assert } from 'marked#util/error/assert';
import { error } from 'marked#util/error/error';

describe('Given an <Assert> function', (): void => {

    it('exist should be fine if element is exist', (): void => {

        const result: boolean = assert(10).to.be.exist();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('exist should be throw an error if element is not exist', (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST).message;
        const exec: () => void = () => {
            assert(null).to.be.exist();
        };
        expect(exec).to.be.throw(errText);
    });

    it('exist should be fine if element is not exist, but reversed', (): void => {

        const result: boolean = assert(null).to.be.not.exist();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('to be a array should work fine', (): void => {

        const result: boolean = assert([]).to.be.array();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('to be a array should work fine, when false', (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_TYPE_NOT_MATCHED).message;
        const exec: () => void = () => {
            assert({ a: 1 }).to.be.array();
        };
        expect(exec).to.be.throw(errText);
    });

    it('true should be fine if element is true', (): void => {

        const result: boolean = assert(true).to.be.true();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('true should throw when element is not', (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_BOOLEAN_OPPOSITE).message;
        const exec: () => void = () => {
            assert(false).to.be.true();
        };
        expect(exec).to.be.throw(errText);
    });
});
