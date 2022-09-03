/**
 * @author WMXPY
 * @namespace Variable_SandClass
 * @description Sand Class Instance
 */

import { SandMap } from "../sand-map";
import { SandClass } from "./sand-class";

export class SandClassInstance {

    public static create(targetClass: SandClass): SandClassInstance {

        return new SandClassInstance(targetClass);
    }

    private readonly _targetClass: SandClass;

    private _body: SandMap<any>;

    private constructor(targetClass: SandClass) {

        this._targetClass = targetClass;

        this._body = this._initialize(targetClass);
    }

    public get targetClass(): SandClass {
        return this._targetClass;
    }
    public get body(): SandMap<any> {
        return this._body;
    }

    private _initialize(targetClass: SandClass): SandMap<any> {

        const targetMap: SandMap<any> = targetClass.body;
        return targetMap.clone();
    }
}
