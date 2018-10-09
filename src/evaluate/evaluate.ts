/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import * as Calculate_Evaluators from "marked#evaluate/calculate";
import * as Expression_Evaluators from "marked#evaluate/expression";
import * as Module_Evaluators from "marked#evaluate/module";
import * as Symbol_Evaluators from "marked#evaluate/symbol";
import * as Variable_Evaluators from "marked#evaluate/variable";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {

    sandbox.mount('BlockStatement', Symbol_Evaluators.blockEvaluator);
    sandbox.mount('Identifier', Symbol_Evaluators.identifierEvaluator);
    sandbox.mount('Literal', Symbol_Evaluators.literalEvaluator);
    sandbox.mount('Program', Symbol_Evaluators.programEvaluator);

    sandbox.mount('BreakStatement', Symbol_Evaluators.breakEvaluator);
    sandbox.mount('ContinueStatement', Symbol_Evaluators.continueEvaluator);
    sandbox.mount('ReturnStatement', Symbol_Evaluators.returnEvaluator);
};

export const useExpression = (sandbox: Sandbox) => {

    sandbox.mount('ArrowFunctionExpression', Expression_Evaluators.arrowFunctionEvaluator);
    sandbox.mount('FunctionDeclaration', Expression_Evaluators.functionDeclarationEvaluator);
    sandbox.mount('FunctionExpression', Expression_Evaluators.functionExpressionEvaluator);

    sandbox.mount('CallExpression', Expression_Evaluators.calleeEvaluator);
    sandbox.mount('ExpressionStatement', Expression_Evaluators.expressionEvaluator);
    sandbox.mount('IfStatement', Expression_Evaluators.ifStatementEvaluator);

    sandbox.mount('ForInStatement', Expression_Evaluators.forInStatementEvaluator);
    sandbox.mount('ForOfStatement', Expression_Evaluators.forOfStatementEvaluator);
    sandbox.mount('ForStatement', Expression_Evaluators.forStatementEvaluator);
};

export const useVariable = (sandbox: Sandbox) => {

    sandbox.mount('ArrayExpression', Variable_Evaluators.arrayExpressionEvaluator);
    sandbox.mount('AssignmentExpression', Variable_Evaluators.assignmentExpressionEvaluator);
    sandbox.mount('ObjectExpression', Variable_Evaluators.objectExpressionEvaluator);
    sandbox.mount('MemberExpression', Variable_Evaluators.memberEvaluator);
    sandbox.mount('VariableDeclaration', Variable_Evaluators.variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: Sandbox) => {

    sandbox.mount('BinaryExpression', Calculate_Evaluators.binaryExpressionEvaluator);
    sandbox.mount('LogicalExpression', Calculate_Evaluators.logicalExpressionEvaluator);
    sandbox.mount('UnaryExpression', Calculate_Evaluators.unaryExpressionEvaluator);
    sandbox.mount('UpdateExpression', Calculate_Evaluators.updateExpressionEvaluator);
};

export const useModule = (sandbox: Sandbox) => {

    sandbox.mount('ExportNamedDeclaration', Module_Evaluators.exportsNamedDeclarationEvaluator);
    sandbox.mount('ExportDefaultDeclaration', Module_Evaluators.exportsDefaultDeclarationEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
    useModule(sandbox);
};
