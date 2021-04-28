/**
 * @author WMXPY
 * @namespace Variable
 * @description List
 */

import { Variable } from "../variable/variable";

export class SandList<T> {

    private _list: Array<Variable<T>>;

    public constructor(list: T[] = []) {

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

    public toString(): string {

        return this._list.toString();
    }
}
