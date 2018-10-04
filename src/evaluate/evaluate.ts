/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { binaryExpressionEvaluator, unaryExpressionEvaluator, updateExpressionEvaluator } from "marked#evaluate/calculate";
import { arrowFunctionEvaluator, calleeEvaluator, expressionEvaluator, forStatementEvaluator, ifStatementEvaluator } from "marked#evaluate/expression";
import { blockEvaluator, breakEvaluator, continueEvaluator, identifierEvaluator, literalEvaluator, programEvaluator, returnEvaluator } from "marked#evaluate/symbol";
import { variableDeclarationEvaluator } from "marked#evaluate/variable";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {

    sandbox.mount('BlockStatement', blockEvaluator);
    sandbox.mount('Identifier', identifierEvaluator);
    sandbox.mount('Literal', literalEvaluator);
    sandbox.mount('Program', programEvaluator);

    sandbox.mount('BreakStatement', breakEvaluator);
    sandbox.mount('ContinueStatement', continueEvaluator);
    sandbox.mount('ReturnStatement', returnEvaluator);
};

export const useExpression = (sandbox: Sandbox) => {

    sandbox.mount('ArrowFunctionExpression', arrowFunctionEvaluator);
    sandbox.mount('CallExpression', calleeEvaluator);
    sandbox.mount('ExpressionStatement', expressionEvaluator);
    sandbox.mount('ForStatement', forStatementEvaluator);
    sandbox.mount('IfStatement', ifStatementEvaluator);
};

export const useVariable = (sandbox: Sandbox) => {

    sandbox.mount('VariableDeclaration', variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: Sandbox) => {

    sandbox.mount('BinaryExpression', binaryExpressionEvaluator);
    sandbox.mount('UnaryExpression', unaryExpressionEvaluator);
    sandbox.mount('UpdateExpression', updateExpressionEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
};
