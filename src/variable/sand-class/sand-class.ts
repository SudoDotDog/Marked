/**
 * @author WMXPY
 * @namespace Variable_SandClass
 * @description Sand Class
 */

import { SandMap } from "../sand-map";

export class SandClass {

    public static create(className: string): SandClass {

        return new SandClass(className);
    }

    private readonly _className: string;

    private _map: SandMap<any>;

    private constructor(className: string) {

        this._className = className;

        this._map = new SandMap();
    }

    public get className(): string {
        return this._className;
    }
    public get body(): SandMap<any> {
        return this._map;
    }
}
