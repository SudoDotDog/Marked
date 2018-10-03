/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope
 */

export class Scope {
    public static fromScope(scope: Scope) {
        return new Scope(scope);
    }

    public static fromRoot() {
        return new Scope();
    }

    private _parent: Scope | null;

    public constructor(scope?: Scope) {
        this._parent = scope || null;
    }
}
