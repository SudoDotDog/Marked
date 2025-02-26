/**
 * @author WMXPY
 * @namespace Variable_SandClass
 * @description Sand Class
 */

import { ERROR_CODE } from "../../declare/error-code";
import { error } from "../../util/error/error";
import { SandMap } from "../sand-map";

export class SandClass {

    public static create(
        className: string,
    ): SandClass {

        return new SandClass(className);
    }

    private readonly _className: string;

    private readonly _map: SandMap<any>;
    private readonly _staticMap: SandMap<any>;

    private _superClass: SandClass | null;
    private _classConstructor: any | null;

    private constructor(
        className: string,
    ) {

        this._className = className;

        this._map = SandMap.fromScratch();
        this._staticMap = SandMap.fromScratch();

        this._superClass = null;
        this._classConstructor = null;
    }

    public get className(): string {
        return this._className;
    }
    public get body(): SandMap<any> {
        return this._map;
    }
    public get staticBody(): SandMap<any> {
        return this._staticMap;
    }
    public get classConstructor(): any | null {
        return this._classConstructor;
    }

    public setClassConstructor(classConstructor: any): this {

        this._classConstructor = classConstructor;
        return this;
    }

    public lookFor(key: string): any {

        if (this._map.has(key)) {
            return this._map.get(key);
        }
        if (this._superClass) {
            return this._superClass.lookFor(key);
        }
        return null;
    }

    public lookForHas(key: string): boolean {

        if (this._map.has(key)) {
            return true;
        }
        if (this._superClass) {
            return this._superClass.lookForHas(key);
        }
        return false;
    }

    public setSuperClass(superClass: SandClass): this {

        this._superClass = superClass;
        return this;
    }

    public hasSuperClass(): boolean {

        return this._superClass !== null;
    }

    public ensureSuperClass(): SandClass {

        if (this._superClass) {
            return this._superClass;
        }
        throw error(ERROR_CODE.INTERNAL_ERROR, "No super class");
    }

    public sameClass(other: SandClass): boolean {

        if (this === other) {
            return true;
        }

        if (!this._superClass) {
            return false;
        }

        return this._superClass.sameClass(other);
    }

    public toNative(): any {

        return {
            ...this._staticMap.map,
        };
    }
}
