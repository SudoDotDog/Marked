/**
 * @author WMXPY
 * @namespace Variable_Trace
 * @description Trace
 */

import * as EST from "estree";
import { MarkedDebugBreakPointController } from "../../debug/break-point/controller";
import { ERROR_CODE } from "../../declare/error-code";
import { ScriptLocation } from "../../declare/script-location";
import { ITrace } from "../../declare/variable";
import { BaseSourceMapLocationFinder } from "../../source-map/location-finder/base";
import { error } from "../../util/error/error";

export class Trace implements ITrace {

    public static init(
        scriptLocation: ScriptLocation,
        locationFinder: BaseSourceMapLocationFinder,
        breakPointController?: MarkedDebugBreakPointController,
    ): Trace {

        return new Trace(
            scriptLocation,
            null,
            undefined,
            locationFinder,
            breakPointController,
        );
    }

    protected readonly _scriptLocation: ScriptLocation;

    protected readonly _parent: Trace | null;
    protected readonly _node: EST.Node | null;

    protected readonly _locationFinder: BaseSourceMapLocationFinder | null;
    protected readonly _breakPointController: MarkedDebugBreakPointController | null;

    protected _label: string | null;

    protected constructor(
        scriptLocation: ScriptLocation,
        node: EST.Node | null,
        parent?: Trace,
        locationFinder?: BaseSourceMapLocationFinder,
        breakPointController?: MarkedDebugBreakPointController,
    ) {

        this._scriptLocation = scriptLocation;

        this._parent = parent ?? null;
        this._node = node;

        this._locationFinder = locationFinder ?? null;
        this._breakPointController = breakPointController ?? null;

        this._label = null;
    }

    public get scriptLocation(): ScriptLocation {
        return this._scriptLocation;
    }

    public hasBreakPointController(): boolean {

        if (this._breakPointController !== null) {
            return true;
        }
        if (this._parent) {
            return this._parent.hasBreakPointController();
        }
        return false;
    }

    public ensureBreakPointController(): MarkedDebugBreakPointController {

        if (this._breakPointController !== null) {
            return this._breakPointController;
        }
        if (this._parent) {
            return this._parent.ensureBreakPointController();
        }
        throw error(ERROR_CODE.INTERNAL_ERROR, 'No Break Point Controller');
    }

    public ensureLocationFinder(): BaseSourceMapLocationFinder {

        if (this._locationFinder !== null) {
            return this._locationFinder;
        }
        if (this._parent) {
            return this._parent.ensureLocationFinder();
        }
        throw error(ERROR_CODE.INTERNAL_ERROR, 'No Location Finder');
    }

    public getNode(): EST.Node | null {

        return this._node;
    }

    public getParent(): Trace | null {

        return this._parent;
    }

    public stack(node: EST.Node): Trace {

        return new Trace(this._scriptLocation, node, this);
    }

    public stackWithLabel(node: EST.Node, label: string): Trace {

        const trace: Trace = this.stack(node);
        trace._label = label;

        return trace;
    }
}
