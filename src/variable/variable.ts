/**
 * @author WMXPY
 * @namespace Variable
 * @description Variable
 */

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

    public get mutable(): boolean {
        return this._mutable;
    }

    public get(): T {

        return this._value;
    }

    public set(value: T): T {

        this._value = value;
        return value;
    }
}
