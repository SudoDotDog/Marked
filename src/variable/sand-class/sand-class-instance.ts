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

        this._body = targetClass.body.clone();
    }

    public get targetClass(): SandClass {
        return this._targetClass;
    }
    public get body(): SandMap<any> {
        return this._body;
    }

    public lookFor(key: string): any {

        if (this._body.has(key)) {
            return this._body.get(key);
        }

        return this._targetClass.lookFor(key);
    }

    public lookForHas(key: string): boolean {

        if (this._body.has(key)) {
            return true;
        }

        return this._targetClass.lookForHas(key);
    }

    public toNative(): any {

        return this.body.map;
    }
}
