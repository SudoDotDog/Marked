/**
 * @author WMXPY
 * @namespace Declare
 * @description Type
 */

import * as EST from "estree";

export type EST_TYPE = EST.Node['type'];

export interface IESTreeType extends Record<EST_TYPE, any> {

    Identifier: EST.Identifier;
    Literal: EST.Literal;
    Program: EST.Program;
    FunctionDeclaration: EST.FunctionDeclaration;
    FunctionExpression: EST.FunctionExpression;
    ArrowFunctionExpression: EST.ArrowFunctionExpression;
    SwitchCase: EST.SwitchCase;
    CatchClause: EST.CatchClause;
    VariableDeclarator: EST.VariableDeclarator;
    ExpressionStatement: EST.ExpressionStatement;
    BlockStatement: EST.BlockStatement;
    EmptyStatement: EST.EmptyStatement;
    DebuggerStatement: EST.DebuggerStatement;
    WithStatement: EST.WithStatement;
    ReturnStatement: EST.ReturnStatement;
    LabeledStatement: EST.LabeledStatement;
    BreakStatement: EST.BreakStatement;
    ContinueStatement: EST.ContinueStatement;
    IfStatement: EST.IfStatement;
    SwitchStatement: EST.SwitchStatement;
    ThrowStatement: EST.ThrowStatement;
    TryStatement: EST.TryStatement;
    WhileStatement: EST.WhileStatement;
    DoWhileStatement: EST.DoWhileStatement;
    ForStatement: EST.ForStatement;
    ForInStatement: EST.ForInStatement;
    ForOfStatement: EST.ForOfStatement;
    VariableDeclaration: EST.VariableDeclaration;
    ClassDeclaration: EST.ClassDeclaration;
    ThisExpression: EST.ThisExpression;
    ArrayExpression: EST.ArrayExpression;
    ObjectExpression: EST.ObjectExpression;
    YieldExpression: EST.YieldExpression;
    UnaryExpression: EST.UnaryExpression;
    UpdateExpression: EST.UpdateExpression;
    BinaryExpression: EST.BinaryExpression;
    AssignmentExpression: EST.AssignmentExpression;
    LogicalExpression: EST.LogicalExpression;
    MemberExpression: EST.MemberExpression;
    ConditionalExpression: EST.ConditionalExpression;
    CallExpression: EST.CallExpression;
    NewExpression: EST.NewExpression;
    SequenceExpression: EST.SequenceExpression;
    TemplateLiteral: EST.TemplateLiteral;
    TaggedTemplateExpression: EST.TaggedTemplateExpression;
    ClassExpression: EST.ClassExpression;
    MetaProperty: EST.MetaProperty;
    AwaitExpression: EST.AwaitExpression;
    Property: EST.Property;
    Super: EST.Super;
    TemplateElement: EST.TemplateElement;
    SpreadElement: EST.SpreadElement;
    ObjectPattern: EST.ObjectPattern;
    ArrayPattern: EST.ArrayPattern;
    RestElement: EST.RestElement;
    AssignmentPattern: EST.AssignmentPattern;
    ClassBody: EST.ClassBody;
    MethodDefinition: EST.MethodDefinition;
    ImportDeclaration: EST.ImportDeclaration;
    ExportNamedDeclaration: EST.ExportNamedDeclaration;
    ExportDefaultDeclaration: EST.ExportDefaultDeclaration;
    ExportAllDeclaration: EST.ExportAllDeclaration;
    ImportSpecifier: EST.ImportSpecifier;
    ImportDefaultSpecifier: EST.ImportDefaultSpecifier;
    ImportNamespaceSpecifier: EST.ImportNamespaceSpecifier;
    ExportSpecifier: EST.ExportSpecifier;
}
