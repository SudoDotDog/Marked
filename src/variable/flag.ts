/**
 * @author WMXPY
 * @namespace Variable
 * @description Flag
 */

import { FLAG_TYPE, ITrace } from "../declare/variable";

export class Flag {

    public static fromReturn(trace: ITrace): Flag {

        return new Flag(FLAG_TYPE.RETURN, trace);
    }

    public static fromBreak(trace: ITrace): Flag {

        return new Flag(FLAG_TYPE.BREAK, trace);
    }

    public static fromContinue(trace: ITrace): Flag {

        return new Flag(FLAG_TYPE.CONTINUE, trace);
    }

    public static fromThrow(trace: ITrace): Flag {

        return new Flag(FLAG_TYPE.THROW, trace);
    }

    private _type: FLAG_TYPE;
    private _value: any | null;

    private _trace: ITrace;

    public constructor(type: FLAG_TYPE, trace: ITrace) {

        this._type = type;
        this._value = null;

        this._trace = trace;
    }

    public get trace(): ITrace {
        return this._trace;
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
