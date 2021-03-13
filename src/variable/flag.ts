/**
 * @author WMXPY
 * @namespace Variable
 * @description Flag
 */

import { FLAG_TYPE } from "../declare/variable";

export class Flag {

    public static fromReturn(): Flag {

        return new Flag(FLAG_TYPE.RETURN);
    }

    public static fromBreak(): Flag {

        return new Flag(FLAG_TYPE.BREAK);
    }

    public static fromContinue(): Flag {

        return new Flag(FLAG_TYPE.CONTINUE);
    }

    public static fromThrow(): Flag {

        return new Flag(FLAG_TYPE.THROW);
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

    public isReturn(): boolean {

        return this._type === FLAG_TYPE.RETURN;
    }

    public isBreak(): boolean {

        return this._type === FLAG_TYPE.BREAK;
    }

    public isContinue(): boolean {

        return this._type === FLAG_TYPE.CONTINUE;
    }

    public isThrow(): boolean {

        return this._type === FLAG_TYPE.THROW;
    }
}
