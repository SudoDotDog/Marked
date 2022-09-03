/**
 * @author WMXPY
 * @namespace Variable
 * @description Function
 */

export class SandFunction {

    public static deject(func: SandFunction | ((...args: any[]) => any)): (...args: any[]) => any {
        if (func instanceof SandFunction) {
            return func.function;
        }
        return func;
    }

    private readonly _function: (...args: any[]) => any;

    public constructor(func: (...args: any[]) => any) {

        this._function = func;
    }

    public get function(): (...args: any[]) => any {
        return this._function;
    }

    public execute(...args: any[]): any {
        return this._function(...args);
    }
}
