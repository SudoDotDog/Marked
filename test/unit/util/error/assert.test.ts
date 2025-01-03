/**
 * @author WMXPY
 * @namespace Util
 * @description Assert Test
 */

import Chance from "chance";
import { ERROR_CODE } from "../../../../src/declare/error-code";
import { assert } from "../../../../src/util/error/assert";
import { error } from "../../../../src/util/error/error";

describe("Given an <Assert> function", (): void => {
    const chance: Chance.Chance = new Chance("error-assert");

    it("exist should be fine if element is exist", (): void => {

        const value: number = chance.integer();
        const result: number = assert(value).to.be.exist().firstValue();

        expect(result).toEqual(value);
    });

    it("should check multiple element with and - happy path", (): void => {

        const value: number = chance.integer();
        const value2: number = chance.integer();
        const test = (): void => {
            assert(value).and(value2).to.be.number().firstValue();
        };

        expect(test).not.toThrow();
    });

    it("should check multiple element with and - sad path", (): void => {

        const value: number = chance.integer();
        const value2: string = chance.string();
        const test = (): void => {
            assert(value).and(value2 as any).to.be.number().firstValue();
        };

        expect(test).toThrow(error(ERROR_CODE.ASSERT_TYPE_NOT_MATCHED).message);
    });

    it("exist should be throw an error if element is not exist", (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST).message;
        const exec: () => void = () => {
            assert(null).to.be.exist();
        };

        expect(exec).toThrow(errText);
    });

    it("exist should be fine if element is not exist, but reversed", (): void => {

        const result: null = assert(null).to.be.not.exist().firstValue();

        expect(result).toBeNull();
    });

    it("to be a array should work fine", (): void => {

        const result: any[] = assert([]).to.be.array().firstValue();

        expect(result).toEqual([]);
    });

    it("should return if element is a number", (): void => {

        const value: number = chance.integer();
        const result: number = assert(value).to.be.number().firstValue();

        expect(result).toEqual(value);
    });

    it("to be a array should work fine, when false", (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_TYPE_NOT_MATCHED).message;
        const exec: () => void = () => {
            assert({ a: 1 }).to.be.array();
        };
        expect(exec).toThrow(errText);
    });

    it("true should be fine if element is true", (): void => {

        const result: boolean = assert(true).to.be.true().firstValue();

        expect(result).toBeTruthy();
    });

    it("true should throw when element is not", (): void => {

        const errText: string = error(ERROR_CODE.ASSERT_BOOLEAN_OPPOSITE).message;
        const exec: () => void = () => {
            assert(false).to.be.true();
        };
        expect(exec).toThrow(errText);
    });
});
