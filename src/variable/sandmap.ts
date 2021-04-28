/**
 * @author WMXPY
 * @namespace Variable
 * @description Map
 */

import { Variable } from "../variable/variable";

export class SandMap<T> {

    private _map: Map<string, Variable<T>>;

    public constructor(obj?: Record<string, any>) {

        this._map = new Map<string, Variable<T>>();

        if (typeof obj !== 'undefined') {

            Object.keys(obj).forEach((key: string) => {
                this.set(key, obj[key]);
            });
        }
    }

    public get map(): {
        [key: string]: T;
    } {

        const map: {
            [key: string]: T;
        } = {};

        this._map.forEach((value: Variable<T>, key: string) => map[key] = value.get());
        return map;
    }

    public keys(): IterableIterator<string> {

        return this._map.keys();
    }

    public get(key: string): T | undefined {

        const variable: Variable<T> | undefined = this._map.get(key);

        return variable
            ? variable.get()
            : undefined;
    }

    public set(key: string, value: T): SandMap<T> {

        const variable: Variable<T> = Variable.mutable(value);

        this._map.set(key, variable);
        return this;
    }

    public getRaw(key: string): Variable<T> | undefined {

        return this._map.get(key);
    }

    public toString(): string {

        const obj: { [key: string]: any } = {};
        this._map.forEach((value: any, key: string) => obj[key] = value);
        return JSON.stringify(obj, null, 2);
    }
}
