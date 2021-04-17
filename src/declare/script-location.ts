/**
 * @author WMXPY
 * @namespace Marked
 * @description Script Location
 */

export class ScriptLocation {

    public static create(protocol: string, location: string): ScriptLocation {

        return new ScriptLocation(protocol, location);
    }

    private _protocol: string;
    private _location: string;

    private constructor(protocol: string, location: string) {

        this._protocol = protocol;
        this._location = location;
    }

    public get protocol(): string {

        return this._protocol;
    }

    public get location(): string {

        return this._location;
    }
}
