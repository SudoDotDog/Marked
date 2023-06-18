/**
 * @author WMXPY
 * @namespace Log
 * @description Declare
 */

import * as EST from "estree";
import { IScope, ITrace } from "../declare/variable";

export interface IMarkedExecuteLog {

    readonly node: EST.Node;
    readonly scope: IScope;
    readonly trace: ITrace;
}
