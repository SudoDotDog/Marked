/**
 * @author WMXPY
 * @namespace Variable
 * @description List
 */

export class SandList<T> {

    private _list: T[];

    public constructor(list: T[]) {
        this._list = list;
    }

    public get length(): number {
        return this._list.length;
    }

    public get(key: number): T | undefined {
        return this._list[key];
    }

    public toString(): string {
        return this._list.toString();
    }
}
