/**
 * @author WMXPY
 * @namespace Variable
 * @description Map
 */

import { SandList } from "./sand-list";
import { Variable } from "./variable";

export class SandMap<T> {

    public static fromScratch<T>(): SandMap<T> {

        return new SandMap<T>({});
    }

    public static fromRawRecord<T>(record: Record<string, T>): SandMap<T> {

        const variablesRecord: Record<string, Variable<T>> = {};
        Object.keys(record).forEach((key: string) => {
            variablesRecord[key] = Variable.mutable(record[key]);
        });

        return new SandMap<T>(variablesRecord);
    }

    private readonly _map: Map<string, Variable<T>>;

    private constructor(record: Record<string, Variable<T>>) {

        const parsedMap = new Map<string, Variable<T>>();
        Object.keys(record).forEach((key: string) => {
            parsedMap.set(key, record[key]);
        });

        this._map = parsedMap;
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

    public keys(): string[] {

        return [...this._map.keys()];
    }

    public has(key: string): boolean {

        return this._map.has(key);
    }

    public get(key: string): T | undefined {

        const variable: Variable<T> | undefined = this._map.get(key);

        return variable
            ? variable.get()
            : undefined;
    }

    public set(key: string, value: T): this {

        const variable: Variable<T> = Variable.mutable(value);

        this._map.set(key, variable);
        return this;
    }

    public concat(map: SandMap<T>): this {

        map.keys().forEach((key: string) => {
            this.set(key, map.get(key) as any);
        });
        return this;
    }

    public getRaw(key: string): Variable<T> | undefined {

        return this._map.get(key);
    }

    public clone(): SandMap<T> {

        const map: SandMap<T> = new SandMap<T>({});
        this._map.forEach((value: Variable<T>, key: string) => {

            const actualValue = value.get();
            if (actualValue instanceof SandMap) {
                map.set(key, actualValue.clone() as any);
            } else if (actualValue instanceof SandList) {
                map.set(key, actualValue.clone() as any);
            } else {
                map.set(key, value.get());
            }
        });
        return map;
    }

    public toString(): string {

        const obj: { [key: string]: any } = {};
        this._map.forEach((value: any, key: string) => obj[key] = value);
        return JSON.stringify(obj, null, 2);
    }
}
