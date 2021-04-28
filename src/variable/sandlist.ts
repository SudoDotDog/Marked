/**
 * @author WMXPY
 * @namespace Variable
 * @description List
 */

import { Variable } from "../variable/variable";

export class SandList<T> {

    private _list: Array<Variable<T>>;

    public constructor(list: T[]) {

        const variableList: Array<Variable<T>> = list.map((value: T) => {

            return Variable.mutable(value);
        });

        this._list = variableList;
    }

    public get list(): T[] {

        return this._list.map((element: Variable<T>): T => element.get());
    }

    public get length(): number {

        return this._list.length;
    }

    public get(key: number): T | undefined {

        const variable: Variable<T> | undefined = this._list[key];

        return variable
            ? variable.get()
            : undefined;
    }

    public getRaw(key: number): Variable<T> | undefined {

        return this._list[key];
    }

    public toString(): string {

        return this._list.toString();
    }
}
