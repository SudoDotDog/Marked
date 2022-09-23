/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Native Class
 */

import { MarkedNativeClassConstructor } from "./declare";

export class MarkedNativeClass {

    public static create(
        constructorMethod: MarkedNativeClassConstructor,
    ): MarkedNativeClass {

        return new MarkedNativeClass(constructorMethod);
    }

    private readonly _constructorMethod: MarkedNativeClassConstructor;

    private constructor(
        constructorMethod: MarkedNativeClassConstructor,
    ) {

        this._constructorMethod = constructorMethod;
    }

    public get constructorMethod(): MarkedNativeClassConstructor {

        return this._constructorMethod;
    }

    public toNative(): any {

        return "[Marked Native Class]";
    }
}
