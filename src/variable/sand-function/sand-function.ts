/**
 * @author WMXPY
 * @namespace Variable_SandFunction
 * @description Sand Function
 */

export class SandFunction {

    public static deject(func: SandFunction | ((...args: any[]) => any)): (...args: any[]) => any {
        if (func instanceof SandFunction) {
            return func.function;
        }
        return func;
    }

    public static create(func: (...args: any[]) => any): SandFunction {

        return new SandFunction(func);
    }

    private readonly _function: (...args: any[]) => any;

    private _thisValue: any | null;

    private constructor(func: (...args: any[]) => any) {

        this._function = func;

        this._thisValue = null;
    }

    public get thisValue(): any | null {
        return this._thisValue;
    }

    public get function(): (...args: any[]) => any {
        return this._function;
    }

    public execute(...args: any[]): any {
        return this._function(this.thisValue, ...args);
    }

    public bindThisValue(thisValue: any): SandFunction {

        const bind: SandFunction = new SandFunction(this._function);
        bind._thisValue = thisValue;

        return bind;
    }
}
