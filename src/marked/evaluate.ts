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
import { mountContinueStatement } from "../evaluate/continue-statement";
import { mountDebuggerStatement } from "../evaluate/debugger-statement";
import { mountEmptyStatement } from "../evaluate/empty-statement";
import * as Expression_Evaluators from "../evaluate/expression";
import { mountFunctionDeclaration } from "../evaluate/function-declaration";
import { mountFunctionExpression } from "../evaluate/function-expression";
import { mountIdentifier } from "../evaluate/identifier";
import { mountLiteral } from "../evaluate/literal";
import { mountLogicalExpression } from "../evaluate/logical-expression";
import { mountMemberExpressionEvaluator } from "../evaluate/member-expression";
import { mountMethodDefinition } from "../evaluate/method-definition";
import * as Module_Evaluators from "../evaluate/module";
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

export const useEverything = (sandbox: ISandbox): void => {

    useExpression(sandbox);
    useModule(sandbox);

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
    mountTryStatement(sandbox);
    mountUnaryExpression(sandbox);
    mountUpdateExpression(sandbox);
    mountVariableDeclaration(sandbox);
};
