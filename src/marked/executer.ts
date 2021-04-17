/**
 * @author WMXPY
 * @namespace Marked
 * @description Executer
 */

import { IExecuter, ISandbox } from "../declare/sandbox";

export class Executer implements IExecuter {

    public static from(sandbox: ISandbox): Executer {

        return new Executer(sandbox);
    }

    private readonly _parent: ISandbox;

    private constructor(sandbox: ISandbox) {

        this._parent = sandbox;
    }

    public get parent(): ISandbox {

        return this._parent;
    }
}
