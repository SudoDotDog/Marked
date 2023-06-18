/**
 * @author WMXPY
 * @namespace Variable
 * @description List
 */

import { Variable } from "./variable";

export class SandList<T> {

    public static fromScratch<T>(): SandList<T> {

        return new SandList<T>([]);
    }

    public static fromRawList<T>(list: T[]): SandList<T> {

        const variableList: Array<Variable<T>> = list.map((value: T) => {

            return Variable.mutable(value);
        });

        return new SandList<T>(variableList);
    }

    public static fromVariableList<T>(list: Array<Variable<T>>): SandList<T> {

        return new SandList<T>(list);
    }

    private _list: Array<Variable<T>>;

    private constructor(list: Array<Variable<T>>) {

        this._list = list;
    }

    public get list(): T[] {

        return this.map((element: Variable<T>): T => element.get());
    }

    public get length(): number {

        return this._list.length;
    }

    public map<MapType>(func: (element: Variable<T>) => MapType): MapType[] {

        return this._list.map((element: Variable<T>) => {
            return func(element);
        });
    }

    public push(value: T): this {

        const variable: Variable<T> = Variable.mutable(value);

        this._list.push(variable);
        return this;
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

    public clone(): SandList<T> {

        const newList: Array<Variable<T>> = [];

        this._list.forEach((element: Variable<T>) => {
            newList.push(element.clone());
        });

        return SandList.fromVariableList(newList as any);
    }

    public toString(): string {

        return this._list.toString();
    }
}
