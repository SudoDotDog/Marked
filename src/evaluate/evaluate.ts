/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { binaryExpressionEvaluator } from "marked#evaluate/calculate";
import { arrowFunctionEvaluator, calleeEvaluator, expressionEvaluator } from "marked#evaluate/expression";
import { blockEvaluator, identifierEvaluator, literalEvaluator, programEvaluator, returnEvaluator } from "marked#evaluate/symbol";
import { variableDeclarationEvaluator } from "marked#evaluate/variable";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {

    sandbox.mount('Program', programEvaluator);
    sandbox.mount('Identifier', identifierEvaluator);
    sandbox.mount('Literal', literalEvaluator);
    sandbox.mount('BlockStatement', blockEvaluator);
    sandbox.mount('ReturnStatement', returnEvaluator);
};

export const useExpression = (sandbox: Sandbox) => {

    sandbox.mount('ExpressionStatement', expressionEvaluator);
    sandbox.mount('CallExpression', calleeEvaluator);
    sandbox.mount('ArrowFunctionExpression', arrowFunctionEvaluator);
};

export const useVariable = (sandbox: Sandbox) => {

    sandbox.mount('VariableDeclaration', variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: Sandbox) => {

    sandbox.mount('BinaryExpression', binaryExpressionEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
};
