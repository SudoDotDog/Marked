/**
 * @author WMXPY
 * @namespace Variable
 * @description Variable
 */

import { ERROR_CODE } from "../declare/error";
import { error } from "../util/error/error";

export class Variable<T> {

    public static mutable<T>(value: T): Variable<T> {

        return new Variable<T>(value, true);
    }

    public static immutable<T>(value: T): Variable<T> {

        return new Variable<T>(value, false);
    }

    private _value: T;
    private readonly _mutable: boolean;

    private constructor(value: T, mutable: boolean) {

        this._value = value;
        this._mutable = mutable;
    }

    public get(): T {

        return this._value;
    }

    public set(value: T): T {

        if (!this._mutable) {
            throw error(ERROR_CODE.IMMUTABLE_VARIABLE_CANNOT_BE_EDITED);
        }

        this._value = value;
        return value;
    }
}
