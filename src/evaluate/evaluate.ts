/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { programEvaluator } from "marked#evaluate/symbol";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {
    sandbox.mount('Program', programEvaluator);
};
