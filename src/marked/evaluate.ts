/**
 * @author WMXPY
 * @namespace Marked
 * @description Evaluate
 */

import { ISandbox } from "../declare/sandbox";
import { mountArrayExpression } from "../evaluate/array-expression";
import { mountArrowFunctionExpression } from "../evaluate/arrow-function-expression";
import { mountAssignmentExpression } from "../evaluate/assignment-expression";
import { mountBinaryExpression } from "../evaluate/binary-expression";
import { mountBlockStatement } from "../evaluate/block-statement";
import { mountBreakStatement } from "../evaluate/break-statement";
import { mountCallExpression } from "../evaluate/call-expression";
import { mountCatchClause } from "../evaluate/catch-clause";
import { mountChainExpression } from "../evaluate/chain-expression";
import { mountClassBody } from "../evaluate/class-body";
import { mountClassDeclaration } from "../evaluate/class-declaration";
import { mountConditionalExpression } from "../evaluate/conditional-expression";
import { mountContinueStatement } from "../evaluate/continue-statement";
import { mountDebuggerStatement } from "../evaluate/debugger-statement";
import { mountDoWhileStatement } from "../evaluate/do-while-statement";
import { mountEmptyStatement } from "../evaluate/empty-statement";
import { mountExportDefaultDeclaration } from "../evaluate/export-default-declaration";
import { mountExportNamedDeclaration } from "../evaluate/export-named-declaration";
import * as Expression_Evaluators from "../evaluate/expression";
import { mountExpressionStatement } from "../evaluate/expression-statement";
import { mountForInStatement } from "../evaluate/for-in-statement";
import { mountForOfStatement } from "../evaluate/for-of-statement";
import { mountForStatement } from "../evaluate/for-statement";
import { mountFunctionDeclaration } from "../evaluate/function-declaration";
import { mountFunctionExpression } from "../evaluate/function-expression";
import { mountIdentifier } from "../evaluate/identifier";
import { mountImportDeclaration } from "../evaluate/import-declaration";
import { mountImportDefaultSpecifier } from "../evaluate/import-default-specifier";
import { mountImportNamespaceSpecifier } from "../evaluate/import-namespace-specifier";
import { mountImportSpecifier } from "../evaluate/import-specifier";
import { mountLiteral } from "../evaluate/literal";
import { mountLogicalExpression } from "../evaluate/logical-expression";
import { mountMemberExpressionEvaluator } from "../evaluate/member-expression";
import { mountMethodDefinition } from "../evaluate/method-definition";
import { mountNewExpression } from "../evaluate/new-expression";
import { mountObjectExpression } from "../evaluate/object-expression";
import { mountProgram } from "../evaluate/program";
import { mountPropertyDefinition } from "../evaluate/property-definition";
import { mountReturnStatement } from "../evaluate/return-statement";
import { mountSpreadElement } from "../evaluate/spread-element";
import { mountTemplateLiteral } from "../evaluate/template-literal";
import { mountThisExpression } from "../evaluate/this-expression";
import { mountThrowStatement } from "../evaluate/throw-statement";
import { mountTryStatement } from "../evaluate/try-statement";
import { mountUnaryExpression } from "../evaluate/unary-expression";
import { mountUpdateExpression } from "../evaluate/update-expression";
import { mountVariableDeclaration } from "../evaluate/variable-declaration";

export const useExpression = (sandbox: ISandbox): void => {

    sandbox.mount('SequenceExpression', Expression_Evaluators.sequenceExpressionEvaluator);

    sandbox.mount('IfStatement', Expression_Evaluators.ifStatementEvaluator);

    sandbox.mount('WhileStatement', Expression_Evaluators.whileStatementEvaluator);

    sandbox.mount('SwitchCase', Expression_Evaluators.switchCaseEvaluator);
    sandbox.mount('SwitchStatement', Expression_Evaluators.switchExpressionEvaluator);
};

export const useEverything = (sandbox: ISandbox): void => {

    useExpression(sandbox);

    mountArrayExpression(sandbox);
    mountArrowFunctionExpression(sandbox);
    mountAssignmentExpression(sandbox);
    mountBinaryExpression(sandbox);
    mountBlockStatement(sandbox);
    mountBreakStatement(sandbox);
    mountCallExpression(sandbox);
    mountCatchClause(sandbox);
    mountChainExpression(sandbox);
    mountClassBody(sandbox);
    mountClassDeclaration(sandbox);
    mountConditionalExpression(sandbox);
    mountContinueStatement(sandbox);
    mountDebuggerStatement(sandbox);
    mountDoWhileStatement(sandbox);
    mountEmptyStatement(sandbox);
    mountExportDefaultDeclaration(sandbox);
    mountExportNamedDeclaration(sandbox);
    mountExpressionStatement(sandbox);
    mountForInStatement(sandbox);
    mountForOfStatement(sandbox);
    mountForStatement(sandbox);
    mountFunctionDeclaration(sandbox);
    mountFunctionExpression(sandbox);
    mountIdentifier(sandbox);
    mountImportDeclaration(sandbox);
    mountImportDefaultSpecifier(sandbox);
    mountImportNamespaceSpecifier(sandbox);
    mountImportSpecifier(sandbox);
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
    mountTryStatement(sandbox);
    mountUnaryExpression(sandbox);
    mountUpdateExpression(sandbox);
    mountVariableDeclaration(sandbox);
};
