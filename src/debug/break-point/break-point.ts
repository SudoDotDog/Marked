/**
 * @author WMXPY
 * @namespace Debug_BreakPoint
 * @description Break Point
 */

import * as EST from "estree";

export abstract class MarkedDebugBreakPoint {

    public abstract shouldTrigger(node: EST.Node): boolean;
    public abstract shouldReset(node: EST.Node): boolean;
}
