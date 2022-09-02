/**
 * @author WMXPY
 * @namespace Variable
 * @description Function
 */

export class SandFunction {

    private _function: (...args: any[]) => any;

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
