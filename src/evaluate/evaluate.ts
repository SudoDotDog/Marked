/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { Marked } from "marked";
import { programEvaluator } from "marked#evaluate/symbol";

export const useSymbol = (marked: Marked) => {
    marked.mount('Program', programEvaluator);
};
