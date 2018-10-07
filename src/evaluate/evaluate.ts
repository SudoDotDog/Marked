/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { binaryExpressionEvaluator, logicalExpressionEvaluator, unaryExpressionEvaluator, updateExpressionEvaluator } from "marked#evaluate/calculate";
import { arrowFunctionEvaluator, calleeEvaluator, expressionEvaluator, forOfStatementEvaluator, forStatementEvaluator, ifStatementEvaluator } from "marked#evaluate/expression";
import { exportsDefaultDeclarationEvaluator, exportsNamedDeclarationEvaluator } from "marked#evaluate/module";
import { blockEvaluator, breakEvaluator, continueEvaluator, identifierEvaluator, literalEvaluator, programEvaluator, returnEvaluator } from "marked#evaluate/symbol";
import { arrayExpressionEvaluator, memberEvaluator, objectExpressionEvaluator, variableDeclarationEvaluator } from "marked#evaluate/variable";
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
    sandbox.mount('ForOfStatement', forOfStatementEvaluator);
    sandbox.mount('ForStatement', forStatementEvaluator);
    sandbox.mount('IfStatement', ifStatementEvaluator);
};

export const useVariable = (sandbox: Sandbox) => {

    sandbox.mount('ArrayExpression', arrayExpressionEvaluator);
    sandbox.mount('ObjectExpression', objectExpressionEvaluator);
    sandbox.mount('MemberExpression', memberEvaluator);
    sandbox.mount('VariableDeclaration', variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: Sandbox) => {

    sandbox.mount('BinaryExpression', binaryExpressionEvaluator);
    sandbox.mount('LogicalExpression', logicalExpressionEvaluator);
    sandbox.mount('UnaryExpression', unaryExpressionEvaluator);
    sandbox.mount('UpdateExpression', updateExpressionEvaluator);
};

export const useModule = (sandbox: Sandbox) => {

    sandbox.mount('ExportNamedDeclaration', exportsNamedDeclarationEvaluator);
    sandbox.mount('ExportDefaultDeclaration', exportsDefaultDeclarationEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
    useModule(sandbox);
};
