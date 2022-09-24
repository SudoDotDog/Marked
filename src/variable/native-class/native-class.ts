/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Native Class
 */

import { MarkedNativeClassConstructor } from "./declare";

export class MarkedNativeClass {

    public static create(
        constructorMethod: MarkedNativeClassConstructor,
        staticMap: Record<string, any> = {},
    ): MarkedNativeClass {

        return new MarkedNativeClass(
            constructorMethod,
            staticMap,
        );
    }

    private readonly _constructorMethod: MarkedNativeClassConstructor;
    private _staticMap: Record<string, any>;

    private constructor(
        constructorMethod: MarkedNativeClassConstructor,
        staticMap: Record<string, any>,
    ) {

        this._constructorMethod = constructorMethod;
        this._staticMap = staticMap;
    }

    public get constructorMethod(): MarkedNativeClassConstructor {

        return this._constructorMethod;
    }

    public getStaticMember(name: string): any {

        return this._staticMap[name];
    }

    public toNative(): any {

        return "[Marked Native Class]";
    }
}
