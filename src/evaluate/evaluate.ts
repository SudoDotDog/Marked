/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { calleeEvaluator, expressionEvaluator } from "marked#evaluate/expression";
import { identifierEvaluator, literalEvaluator, programEvaluator } from "marked#evaluate/symbol";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {
    sandbox.mount('Program', programEvaluator);
    sandbox.mount('Identifier', identifierEvaluator);
    sandbox.mount('Literal', literalEvaluator);
};

export const useExpression = (sandbox: Sandbox) => {
    sandbox.mount('ExpressionStatement', expressionEvaluator);
    sandbox.mount('CallExpression', calleeEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {
    useSymbol(sandbox);
    useExpression(sandbox);
};
