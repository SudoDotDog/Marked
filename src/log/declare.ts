/**
 * @author WMXPY
 * @namespace Log
 * @description Declare
 */

import * as EST from "estree";
import { ScriptLocation } from "../declare/script-location";
import { IScope, ITrace } from "../declare/variable";

export interface IMarkedExecuteLog {

    readonly node: EST.Node;
    readonly scriptLocation: ScriptLocation;
    readonly scope: IScope;
    readonly trace: ITrace;
}
