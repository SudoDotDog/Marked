/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Native Class
 */

import { ISandbox } from "../../declare/sandbox";
import { defaultMarkedNativeClassGetStaticMemberFunction, defaultMarkedNativeClassToNativeFunction, MarkedNativeClassConstructor, MarkedNativeClassGetStaticMemberFunction, MarkedNativeClassToNativeFunction } from "./declare";

export class MarkedNativeClass {

    public static create(
        constructorMethod: MarkedNativeClassConstructor,
        getStaticMemberFunction: MarkedNativeClassGetStaticMemberFunction = defaultMarkedNativeClassGetStaticMemberFunction,
        toNativeFunction: MarkedNativeClassToNativeFunction = defaultMarkedNativeClassToNativeFunction,
    ): MarkedNativeClass {

        return new MarkedNativeClass(
            constructorMethod,
            getStaticMemberFunction,
            toNativeFunction,
        );
    }

    private readonly _constructorMethod: MarkedNativeClassConstructor;
    private readonly _getStaticMemberFunction: MarkedNativeClassGetStaticMemberFunction;
    private readonly _toNativeFunction: MarkedNativeClassToNativeFunction;

    private constructor(
        constructorMethod: MarkedNativeClassConstructor,
        getStaticMemberFunction: MarkedNativeClassGetStaticMemberFunction,
        toNativeFunction: MarkedNativeClassToNativeFunction,
    ) {

        this._constructorMethod = constructorMethod;
        this._getStaticMemberFunction = getStaticMemberFunction;
        this._toNativeFunction = toNativeFunction;
    }

    public get constructorMethod(): MarkedNativeClassConstructor {

        return this._constructorMethod;
    }

    public getStaticMember(name: string, sandbox: ISandbox): any {

        return this._getStaticMemberFunction(name, sandbox);
    }

    public toNative(): any {

        return this._toNativeFunction();
    }
}
