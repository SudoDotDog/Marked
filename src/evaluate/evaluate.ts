/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { ISandbox } from "../declare/sandbox";
import { mountArrowFunctionExpression } from "./arrow-function-expression";
import { mountBlockStatement } from "./block-statement";
import * as Calculate_Evaluators from "./calculate";
import { mountCallExpression } from "./call-expression";
import { mountClassBody } from "./class-body";
import { mountClassDeclaration } from "./class-declaration";
import { mountEmptyStatement } from "./empty-statement";
import * as Exception_Evaluators from "./exception";
import * as Expression_Evaluators from "./expression";
import { mountFunctionDeclaration } from "./function-declaration";
import { mountFunctionExpression } from "./function-expression";
import { mountMemberExpressionEvaluator } from "./member-expression";
import { mountMethodDefinition } from "./method-definition";
import * as Module_Evaluators from "./module";
import { mountNewExpression } from "./new-expression";
import { mountPropertyDefinition } from "./property-definition";
import { mountSpreadElement } from "./spread-element";
import * as Symbol_Evaluators from "./symbol";
import { mountTemplateLiteral } from "./template-literal";
import { mountThisExpression } from "./this-expression";
import { mountThrowStatement } from "./throw-statement";
import { mountUnaryExpression } from "./unary-expression";
import * as Variable_Evaluators from "./variable";

export const useSymbol = (sandbox: ISandbox): void => {

    sandbox.mount('Identifier', Symbol_Evaluators.identifierEvaluator);
    sandbox.mount('Literal', Symbol_Evaluators.literalEvaluator);
    sandbox.mount('Program', Symbol_Evaluators.programEvaluator);

    sandbox.mount('BreakStatement', Symbol_Evaluators.breakEvaluator);
    sandbox.mount('ContinueStatement', Symbol_Evaluators.continueEvaluator);
    sandbox.mount('ReturnStatement', Symbol_Evaluators.returnEvaluator);
};

export const useExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ConditionalExpression', Expression_Evaluators.conditionalExpressionEvaluator);
    sandbox.mount('SequenceExpression', Expression_Evaluators.sequenceExpressionEvaluator);

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
    mountBlockStatement(sandbox);
    mountCallExpression(sandbox);
    mountClassBody(sandbox);
    mountClassDeclaration(sandbox);
    mountEmptyStatement(sandbox);
    mountFunctionDeclaration(sandbox);
    mountFunctionExpression(sandbox);
    mountMemberExpressionEvaluator(sandbox);
    mountMethodDefinition(sandbox);
    mountNewExpression(sandbox);
    mountPropertyDefinition(sandbox);
    mountSpreadElement(sandbox);
    mountTemplateLiteral(sandbox);
    mountThisExpression(sandbox);
    mountThrowStatement(sandbox);
    mountUnaryExpression(sandbox);
};
