/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Evaluate
 */

import { ISandbox } from "../declare/sandbox";
import { mountArrayExpression } from "./array-expression";
import { mountArrowFunctionExpression } from "./arrow-function-expression";
import { mountAssignmentExpression } from "./assignment-expression";
import { mountBinaryExpression } from "./binary-expression";
import { mountBlockStatement } from "./block-statement";
import { mountBreakStatement } from "./break-statement";
import { mountCallExpression } from "./call-expression";
import { mountChainExpression } from "./chain-expression";
import { mountClassBody } from "./class-body";
import { mountClassDeclaration } from "./class-declaration";
import { mountContinueStatement } from "./continue-statement";
import { mountDebuggerStatement } from "./debugger-statement";
import { mountEmptyStatement } from "./empty-statement";
import * as Exception_Evaluators from "./exception";
import * as Expression_Evaluators from "./expression";
import { mountFunctionDeclaration } from "./function-declaration";
import { mountFunctionExpression } from "./function-expression";
import { mountIdentifier } from "./identifier";
import { mountLiteral } from "./literal";
import { mountLogicalExpression } from "./logical-expression";
import { mountMemberExpressionEvaluator } from "./member-expression";
import { mountMethodDefinition } from "./method-definition";
import * as Module_Evaluators from "./module";
import { mountNewExpression } from "./new-expression";
import { mountObjectExpression } from "./object-expression";
import { mountProgram } from "./program";
import { mountPropertyDefinition } from "./property-definition";
import { mountReturnStatement } from "./return-statement";
import { mountSpreadElement } from "./spread-element";
import { mountTemplateLiteral } from "./template-literal";
import { mountThisExpression } from "./this-expression";
import { mountThrowStatement } from "./throw-statement";
import { mountUnaryExpression } from "./unary-expression";
import { mountUpdateExpression } from "./update-expression";
import { mountVariableDeclaration } from "./variable-declaration";

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

    useExpression(sandbox);
    useModule(sandbox);
    useException(sandbox);

    mountArrayExpression(sandbox);
    mountArrowFunctionExpression(sandbox);
    mountAssignmentExpression(sandbox);
    mountBinaryExpression(sandbox);
    mountBlockStatement(sandbox);
    mountBreakStatement(sandbox);
    mountCallExpression(sandbox);
    mountChainExpression(sandbox);
    mountClassBody(sandbox);
    mountClassDeclaration(sandbox);
    mountContinueStatement(sandbox);
    mountDebuggerStatement(sandbox);
    mountEmptyStatement(sandbox);
    mountFunctionDeclaration(sandbox);
    mountFunctionExpression(sandbox);
    mountIdentifier(sandbox);
    mountLiteral(sandbox);
    mountLogicalExpression(sandbox);
    mountMemberExpressionEvaluator(sandbox);
    mountMethodDefinition(sandbox);
    mountNewExpression(sandbox);
    mountObjectExpression(sandbox);
    mountProgram(sandbox);
    mountPropertyDefinition(sandbox);
    mountReturnStatement(sandbox);
    mountSpreadElement(sandbox);
    mountTemplateLiteral(sandbox);
    mountThisExpression(sandbox);
    mountThrowStatement(sandbox);
    mountUnaryExpression(sandbox);
    mountUpdateExpression(sandbox);
    mountVariableDeclaration(sandbox);
};
