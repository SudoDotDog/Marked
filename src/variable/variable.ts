/**
 * @author WMXPY
 * @namespace Variable
 * @description Variable
 */

export class Variable<T> {
    private _value: T;

    public constructor(value: T) {
        this._value = value;
    }

    public get(): T {
        return this._value;
    }

    public set(value: T): T {
        this._value = value;
        return value;
    }
}
