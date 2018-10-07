/**
 * @author WMXPY
 * @namespace Variable
 * @description Map
 */

export class SandMap<T> {

    private _map: Map<string, T>;

    public constructor() {

        this._map = new Map<string, T>();
    }

    public get(key: string): T | undefined {

        return this._map.get(key);
    }

    public set(key: string, value: T): SandMap<T> {

        this._map.set(key, value);
        return this;
    }

    public toString(): string {

        return this._map.toString();
    }
}
