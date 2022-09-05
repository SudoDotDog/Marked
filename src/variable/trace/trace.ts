/**
 * @author WMXPY
 * @namespace Variable_Trace
 * @description Trace
 */

import * as EST from "estree";
import { MarkedDebugBreakPointController } from "../../debug/break-point/controller";
import { ScriptLocation } from "../../declare/script-location";
import { ITrace } from "../../declare/variable";

export class Trace implements ITrace {

    public static init(
        scriptLocation: ScriptLocation,
        breakPointController?: MarkedDebugBreakPointController,
    ): Trace {

        return new Trace(
            scriptLocation,
            null,
            undefined,
            breakPointController,
        );
    }

    protected readonly _scriptLocation: ScriptLocation;

    protected readonly _parent: Trace | null;
    protected readonly _node: EST.Node | null;

    protected readonly _breakPointController: MarkedDebugBreakPointController | null = null;

    protected constructor(
        scriptLocation: ScriptLocation,
        node: EST.Node | null,
        parent?: Trace,
        breakPointController?: MarkedDebugBreakPointController,
    ) {

        this._scriptLocation = scriptLocation;

        this._parent = parent ?? null;
        this._node = node;

        this._breakPointController = breakPointController ?? null;
    }

    public get scriptLocation(): ScriptLocation {
        return this._scriptLocation;
    }

    public hasBreakPointController(): boolean {

        return this._breakPointController !== null;
    }

    public ensureBreakPointController(): MarkedDebugBreakPointController {

        return this._breakPointController as MarkedDebugBreakPointController;
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
}
