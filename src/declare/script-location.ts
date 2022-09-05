/**
 * @author WMXPY
 * @namespace Marked
 * @description Script Location
 */

const Root_Protocol: string = "__$marked-root-protocol";
const Root_Location: string = "__$marked-root-location";

export class ScriptLocation {

    public static create(protocol: string, location: string): ScriptLocation {

        return new ScriptLocation(protocol, location);
    }

    public static createRoot(): ScriptLocation {

        return ScriptLocation.create(Root_Protocol, Root_Location);
    }

    private _protocol: string;
    private _location: string;

    protected constructor(protocol: string, location: string) {

        this._protocol = protocol;
        this._location = location;
    }

    public get protocol(): string {

        return this._protocol;
    }

    public get location(): string {

        return this._location;
    }

    public isRoot(): boolean {

        return this._protocol === Root_Protocol
            && this._location === Root_Location;
    }

    public compare(targetLocation: ScriptLocation): boolean {

        return this._protocol === targetLocation.protocol
            && this._location === targetLocation.location;
    }

    public hash(): string {

        return `${this._protocol}://${this._location}`;
    }

    public toString(): string {

        return this.hash();
    }
}
