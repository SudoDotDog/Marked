/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { ISandbox } from "../declare/sandbox";
import { mountArrowFunctionExpression } from "./arrow-function-expression";
import * as Calculate_Evaluators from "./calculate";
import { mountEmptyStatement } from "./empty-statement";
import * as Exception_Evaluators from "./exception";
import * as Expression_Evaluators from "./expression";
import { mountFunctionDeclaration } from "./function-declaration";
import { mountFunctionExpression } from "./function-expression";
import * as Module_Evaluators from "./module";
import * as Symbol_Evaluators from "./symbol";
import { mountTemplateLiteral } from "./template-literal";
import { mountUnaryExpression } from "./unary-expression";
import * as Variable_Evaluators from "./variable";

export const useSymbol = (sandbox: ISandbox): void => {

    sandbox.mount('BlockStatement', Symbol_Evaluators.blockEvaluator);
    sandbox.mount('Identifier', Symbol_Evaluators.identifierEvaluator);
    sandbox.mount('Literal', Symbol_Evaluators.literalEvaluator);
    sandbox.mount('Program', Symbol_Evaluators.programEvaluator);
    sandbox.mount('ThisExpression', Symbol_Evaluators.thisExpressionEvaluator);

    sandbox.mount('BreakStatement', Symbol_Evaluators.breakEvaluator);
    sandbox.mount('ContinueStatement', Symbol_Evaluators.continueEvaluator);
    sandbox.mount('ReturnStatement', Symbol_Evaluators.returnEvaluator);
};

export const useExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ConditionalExpression', Expression_Evaluators.conditionalExpressionEvaluator);
    sandbox.mount('SequenceExpression', Expression_Evaluators.sequenceExpressionEvaluator);

    sandbox.mount('CallExpression', Expression_Evaluators.calleeEvaluator);
    sandbox.mount('ExpressionStatement', Expression_Evaluators.expressionEvaluator);
    sandbox.mount('IfStatement', Expression_Evaluators.ifStatementEvaluator);

    sandbox.mount('ForInStatement', Expression_Evaluators.forInStatementEvaluator);
    sandbox.mount('ForOfStatement', Expression_Evaluators.forOfStatementEvaluator);
    sandbox.mount('ForStatement', Expression_Evaluators.forStatementEvaluator);
    sandbox.mount('WhileStatement', Expression_Evaluators.whileStatementEvaluator);
    sandbox.mount('DoWhileStatement', Expression_Evaluators.doWhileStatementEvaluator);

    sandbox.mount('SwitchCase', Expression_Evaluators.switchCaseEvaluator);
    sandbox.mount('SwitchStatement', Expression_Evaluators.switchExpressionEvaluator);
};

export const useVariable = (sandbox: ISandbox): void => {

    sandbox.mount('ArrayExpression', Variable_Evaluators.arrayExpressionEvaluator);
    sandbox.mount('AssignmentExpression', Variable_Evaluators.assignmentExpressionEvaluator);
    sandbox.mount('ObjectExpression', Variable_Evaluators.objectExpressionEvaluator);
    sandbox.mount('MemberExpression', Variable_Evaluators.memberEvaluator);
    sandbox.mount('VariableDeclaration', Variable_Evaluators.variableDeclarationEvaluator);
};

export const useCalculate = (sandbox: ISandbox): void => {

    sandbox.mount('BinaryExpression', Calculate_Evaluators.binaryExpressionEvaluator);
    sandbox.mount('LogicalExpression', Calculate_Evaluators.logicalExpressionEvaluator);
    sandbox.mount('UpdateExpression', Calculate_Evaluators.updateExpressionEvaluator);
};

export const useModule = (sandbox: ISandbox): void => {

    sandbox.mount('ExportNamedDeclaration', Module_Evaluators.exportsNamedDeclarationEvaluator);
    sandbox.mount('ExportDefaultDeclaration', Module_Evaluators.exportsDefaultDeclarationEvaluator);

    sandbox.mount('ImportDeclaration', Module_Evaluators.importDeclarationEvaluator);
    sandbox.mount('ImportDefaultSpecifier', Module_Evaluators.importDefaultSpecifierEvaluator);
    sandbox.mount('ImportNamespaceSpecifier', Module_Evaluators.importNamespaceSpecifierEvaluator);
    sandbox.mount('ImportSpecifier', Module_Evaluators.importSpecifierEvaluator);
};

export const useException = (sandbox: ISandbox): void => {

    sandbox.mount('TryStatement', Exception_Evaluators.tryEvaluator);
    sandbox.mount('ThrowStatement', Exception_Evaluators.throwEvaluator);
    sandbox.mount('CatchClause', Exception_Evaluators.catchEvaluator);
};

export const useEverything = (sandbox: ISandbox): void => {

    useSymbol(sandbox);
    useExpression(sandbox);
    useVariable(sandbox);
    useCalculate(sandbox);
    useModule(sandbox);
    useException(sandbox);

    mountArrowFunctionExpression(sandbox);
    mountEmptyStatement(sandbox);
    mountFunctionDeclaration(sandbox);
    mountFunctionExpression(sandbox);
    mountTemplateLiteral(sandbox);
    mountUnaryExpression(sandbox);
};
