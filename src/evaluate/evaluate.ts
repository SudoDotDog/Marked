/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import * as calculate from "marked#evaluate/calculate";
import * as expression from "marked#evaluate/expression";
import * as module from "marked#evaluate/module";
import * as symbol from "marked#evaluate/symbol";
import * as variable from "marked#evaluate/variable";
import { Sandbox } from "../sandbox";

export const useSymbol = (sandbox: Sandbox) => {

    sandbox.mount('BlockStatement', symbol.blockEvaluator);
    sandbox.mount('Identifier', symbol.identifierEvaluator);
    sandbox.mount('Literal', symbol.literalEvaluator);
    sandbox.mount('Program', symbol.programEvaluator);

    sandbox.mount('BreakStatement', symbol.breakEvaluator);
    sandbox.mount('ContinueStatement', symbol.continueEvaluator);
    sandbox.mount('ReturnStatement', symbol.returnEvaluator);
};

export const useExpression = (sandbox: Sandbox) => {

    sandbox.mount('ArrowFunctionExpression', expression.arrowFunctionEvaluator);
    sandbox.mount('FunctionDeclaration', expression.functionDeclarationEvaluator);
    sandbox.mount('FunctionExpression', expression.functionExpressionEvaluator);

    sandbox.mount('CallExpression', expression.calleeEvaluator);
    sandbox.mount('ExpressionStatement', expression.expressionEvaluator);
    sandbox.mount('IfStatement', expression.ifStatementEvaluator);

    sandbox.mount('ForInStatement', expression.forInStatementEvaluator);
    sandbox.mount('ForOfStatement', expression.forOfStatementEvaluator);
    sandbox.mount('ForStatement', expression.forStatementEvaluator);
};

export const useVariable = (sandbox: Sandbox) => {

    sandbox.mount('ArrayExpression', variable.arrayExpressionEvaluator);
    sandbox.mount('AssignmentExpression', variable.assignmentExpressionEvaluator);
    sandbox.mount('ObjectExpression', variable.objectExpressionEvaluator);
    sandbox.mount('MemberExpression', variable.memberEvaluator);
    sandbox.mount('VariableDeclaration', variable.variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: Sandbox) => {

    sandbox.mount('BinaryExpression', calculate.binaryExpressionEvaluator);
    sandbox.mount('LogicalExpression', calculate.logicalExpressionEvaluator);
    sandbox.mount('UnaryExpression', calculate.unaryExpressionEvaluator);
    sandbox.mount('UpdateExpression', calculate.updateExpressionEvaluator);
};

export const useModule = (sandbox: Sandbox) => {

    sandbox.mount('ExportNamedDeclaration', module.exportsNamedDeclarationEvaluator);
    sandbox.mount('ExportDefaultDeclaration', module.exportsDefaultDeclarationEvaluator);
};

export const useEverything = (sandbox: Sandbox) => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
    useModule(sandbox);
};
