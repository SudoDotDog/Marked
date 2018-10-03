/**
 * @author WMXPY
 * @namespace Variable
 * @description Variable
 */

export class Variable {
    private _value: any;

    public constructor(value: any) {
        this._value = value;
    }

    public get(): any {
        return this._value;
    }

    public set(value: any): void {
        this._value = value;
        return;
    }
}
