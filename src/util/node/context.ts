/**
 * @author WMXPY
 * @namespace Util_Node
 * @description Context
 */

export class LimitCounter {

    private _count: number;
    private _limit: number;

    public constructor(limit: number) {

        this._count = 0;
        this._limit = limit;
    }

    public add(): LimitCounter {

        this._count++;
        return this;
    }

    public amount(): number {

        return this._count;
    }

    public addAndCheck(): boolean {

        return this.add().check();
    }

    public check(): boolean {

        if (this._count > this._limit) return true;
        else return false;
    }

    public reset(): LimitCounter {

        this._count = 0;
        return this;
    }
}
