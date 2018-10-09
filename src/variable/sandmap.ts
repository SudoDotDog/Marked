/**
 * @author WMXPY
 * @namespace Variable
 * @description Map
 */

import { Variable } from "marked#variable/variable";

export class SandMap<T> {

    private _map: Map<string, Variable<T>>;

    public constructor() {

        this._map = new Map<string, Variable<T>>();
    }

    public get map(): Map<string, Variable<T>> {
        return this._map;
    }

    public get(key: string): T | undefined {

        const variable: Variable<T> | undefined = this._map.get(key);

        return variable
            ? variable.get()
            : undefined;
    }

    public set(key: string, value: T): SandMap<T> {

        const variable: Variable<T> = new Variable(value);

        this._map.set(key, variable);
        return this;
    }

    public getRaw(key: string): Variable<T> | undefined {

        return this._map.get(key);
    }

    public toString(): string {

        return this._map.toString();
    }
}
