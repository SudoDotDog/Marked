/**
 * @author WMXPY
 * @namespace Marked
 * @description Executer
 */

import { MarkedResult } from "../declare/evaluate";
import { IExecuter, ISandbox } from "../declare/sandbox";
import { ScriptLocation } from "../declare/script-location";
import { Scope } from "../variable/scope";

export class Executer implements IExecuter {

    public static from(sandbox: ISandbox): Executer {

        return new Executer(sandbox);
    }

    private readonly _parent: ISandbox;

    private readonly _rootScope: Scope;

    private constructor(sandbox: ISandbox) {

        this._parent = sandbox;

        this._rootScope = Scope.fromRoot();
    }

    public get parent(): ISandbox {

        return this._parent;
    }

    public get scope(): Scope {

        return this._rootScope;
    }

    public async evaluate(script: string, scriptLocation?: ScriptLocation): Promise<MarkedResult> {

        return await this._parent.evaluate(script, scriptLocation, this._rootScope);
    }
}
