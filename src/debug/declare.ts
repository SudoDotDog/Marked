/**
 * @author WMXPY
 * @namespace Debug
 * @description Declare
 */

import { MarkedDebugFlowController } from "./flow-controller";
import { MarkedDebugSnapshot } from "./snapshot/snapshot";

export type DebugInterceptorListener = (
    snapshot: MarkedDebugSnapshot,
    flowController: MarkedDebugFlowController,
) => void | Promise<void>;
