/**
 * @author WMXPY
 * @namespace Variable_SandFunction
 * @description Sand Function
 */

export class SandFunction {

    public static wrapFunction(
        func: ((...args: any[]) => any) | SandFunction,
    ): SandFunction {

        if (func instanceof SandFunction) {
            return func;
        }
        return SandFunction.create(func);
    }

    public static create(func: (thisValue: any, ...args: any[]) => any): SandFunction {

        return new SandFunction(func);
    }

    private readonly _function: (thisValue: any, ...args: any[]) => any;

    private _thisValue: any | null;

    private constructor(func: (thisValue: any, ...args: any[]) => any) {

        this._function = func;

        this._thisValue = null;
    }

    public get thisValue(): any | null {
        return this._thisValue;
    }

    public execute(...args: any[]): any {

        console.log('execute', this._function, this._thisValue, args);
        return this._function(this._thisValue, ...args);
    }

    public bindThisValue(thisValue: any): SandFunction {

        const bind: SandFunction = new SandFunction(this._function);
        bind._thisValue = thisValue;

        return bind;
    }
}
