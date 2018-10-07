/**
 * @author WMXPY
 * @namespace Util_Error
 * @description Assert
 */

import { ERROR_CODE } from "marked#declare/error";
import { error } from "marked#util/error/error";
import { isNumber, isString } from "util";

class Assert<T> {
    private _elements: T[];
    private _reverse: boolean;

    public constructor(element: T) {
        this._elements = [element];
        this._reverse = false;
    }

    public get is(): Assert<T> {
        return this;
    }

    public get to(): Assert<T> {
        return this;
    }

    public get be(): Assert<T> {
        return this;
    }

    public get not(): Assert<T> {
        this._reverse = true;
        return this;
    }

    public and(element: T): Assert<T> {
        this._elements.push(element);
        return this;
    }

    public exist(code: ERROR_CODE = ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST): Assert<T> {
        const result: boolean = this.eachElement((value: T) => {
            return value !== null && value !== undefined;
        });
        if (!result) {
            throw error(code);
        }
        return this;
    }

    public true(code: ERROR_CODE = ERROR_CODE.ASSERT_BOOLEAN_OPPOSITE): Assert<T> {
        const result: boolean = this.eachElement((value: T) => {
            return Boolean(value);
        });
        if (!result) {
            throw error(code);
        }
        return this;
    }

    public array(code: ERROR_CODE = ERROR_CODE.ASSERT_TYPE_NOT_MATCHED): Assert<T> {
        const result: boolean = this.eachElement((value: T) => {
            return value instanceof Array;
        });
        if (!result) {
            throw error(code);
        }
        return this;
    }

    public number(code: ERROR_CODE = ERROR_CODE.ASSERT_TYPE_NOT_MATCHED): Assert<T> {
        const result: boolean = this.eachElement((value: T) => {
            return isNumber(value);
        });
        if (!result) {
            throw error(code);
        }
        return this;
    }

    public string(code: ERROR_CODE = ERROR_CODE.ASSERT_TYPE_NOT_MATCHED): Assert<T> {
        const result: boolean = this.eachElement((value: T) => {
            return isString(value);
        });
        if (!result) {
            throw error(code);
        }
        return this;
    }

    public firstValue(): T {
        return this._elements[0];
    }

    protected eachElement(func: (value: T) => boolean) {
        for (let element of this._elements) {
            const result: boolean = func(element);
            if (this._reverse === result) {
                return false;
            }
        }
        return true;
    }
}

export const assert = <T>(element: T) => {
    return new Assert<T>(element);
};
