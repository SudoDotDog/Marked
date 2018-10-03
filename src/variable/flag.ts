/**
 * @author WMXPY
 * @namespace Variable
 * @description Flag
 */

import { FLAG_TYPE } from "marked#declare/variable";

export class Flag {

    public static fromReturn() {
        return new Flag(FLAG_TYPE.RETURN);
    }

    private _type: FLAG_TYPE;
    private _value: any | null;

    public constructor(type: FLAG_TYPE) {
        this._type = type;
        this._value = null;
    }

    public setValue(value: any): Flag {
        this._value = value;
        return this;
    }

    public getValue(): any | null {
        return this._value;
    }
}
