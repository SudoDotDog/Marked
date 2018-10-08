/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { error } from "marked#util/error/error";
import { Flag } from "marked#variable/flag";
import { SandList } from "marked#variable/sandlist";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "../sandbox";

export const arrowFunctionEvaluator: Evaluator<'ArrowFunctionExpression'> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const func = async (...args: any[]): Promise<any> => {

            const subScope = Scope.fromScope(scope);
            for (let i = 0; i < node.params.length; i++) {
                const pattern: EST.Identifier = node.params[i] as EST.Identifier;
                const value: any = args[i];

                subScope.register(VARIABLE_TYPE.CONSTANT)(pattern.name, value);
            }
            const result: Flag = await this.execute(node.body, subScope, nextTrace);
            if (result) {
                return result.getValue();
            }
        };
        return func;
    };

export const calleeEvaluator: Evaluator<'CallExpression'> =
    async function (this: Sandbox, node: EST.CallExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const func: () => any = await this.execute(node.callee, scope, nextTrace);
        const args = [];
        for (const arg of node.arguments) {
            args.push(await this.execute(arg, scope, nextTrace));
        }

        return func.apply(null, args);
    };

export const conditionalExpressionEvaluator: Evaluator<'ConditionalExpression'> =
    async function (this: Sandbox, node: EST.ConditionalExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const conditional: boolean = await this.execute(node.test, scope, nextTrace);

        return conditional
            ? await this.execute(node.consequent, scope, nextTrace)
            : await this.execute(node.alternate, scope, nextTrace);
    };

export const expressionEvaluator: Evaluator<'ExpressionStatement'> =
    async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        return await this.execute(node.expression, scope, nextTrace);
    };

export const forOfStatementEvaluator: Evaluator<'ForOfStatement'> =
    async function (this: Sandbox, node: EST.ForOfStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const lists: SandList<any> = await this.execute(node.right, scope, nextTrace);

        if (!(lists instanceof SandList)) {
            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST, void 0, node, trace);
        }

        if (node.left.type !== 'VariableDeclaration') {
            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST, void 0, node, trace);
        }

        loop: for (let i: number = 0; i < lists.length; i++) {

            const subScope: Scope = Scope.fromScope(scope);
            const current: any = lists.get(i);
            const declarations: EST.VariableDeclarator[] = node.left.declarations;
            const left: EST.VariableDeclaration = node.left;
            const registerFunc = (name: string): void => {

                subScope.register(left.kind as VARIABLE_TYPE)(name, current);
            };

            declarations.forEach((declaration) => {

                const id: EST.Identifier = declaration.id as EST.Identifier;
                registerFunc(id.name);
            });

            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak) {
                    break loop;
                } else if (result.isReturn) {
                    return result.getValue();
                } else if (result.isContinue) {
                    continue loop;
                } else {
                    throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
            }
        }
        return;
    };

export const forStatementEvaluator: Evaluator<'ForStatement'> =
    async function (this: Sandbox, node: EST.ForStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = Scope.fromScope(scope);

        if (node.init) {

            await this.execute(node.init, subScope, nextTrace);
        }

        const test = async (): Promise<boolean> => {

            if (node.test) {

                const result: any = await this.execute(node.test, subScope, nextTrace);
                return Boolean(result);
            } else return true;
        };
        const update = async (): Promise<void> => {

            if (node.update) await this.execute(node.update, subScope, nextTrace);
        };

        loop: for (let limit = 0; (limit < 100 && await test()); limit++) {

            await update();
            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak) {
                    break loop;
                } else if (result.isReturn) {
                    return result.getValue();
                } else if (result.isContinue) {
                    continue loop;
                } else {
                    throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
            }
        }
        return;
    };

export const functionExpressionEvaluator: Evaluator<'FunctionExpression'> =
    async function (this: Sandbox, node: EST.FunctionExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const func = async (...args: any[]): Promise<any> => {

            const subScope = Scope.fromScope(scope);
            for (let i = 0; i < node.params.length; i++) {
                const pattern: EST.Identifier = node.params[i] as EST.Identifier;
                const value: any = args[i];

                subScope.register(VARIABLE_TYPE.CONSTANT)(pattern.name, value);
            }
            const result: Flag = await this.execute(node.body, subScope, nextTrace);
            if (result) {
                return result.getValue();
            }
        };
        return func;
    };

export const functionDeclarationEvaluator: Evaluator<'FunctionDeclaration'> =
    async function (this: Sandbox, node: EST.FunctionDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const func: (...args: any[]) => Promise<any>
            = await functionExpressionEvaluator.bind(this)(node, scope, nextTrace);

        if (!node.id) throw error(ERROR_CODE.UNKNOWN_ERROR, void 0, node, trace);
        const rawName: string = (node.id as EST.Identifier).name;

        scope.register(VARIABLE_TYPE.CONSTANT)(rawName, func);
        return func;
    };

export const ifStatementEvaluator: Evaluator<'IfStatement'> =
    async function (this: Sandbox, node: EST.IfStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const statement: boolean = Boolean(await this.execute(node.test, scope, nextTrace));
        const subScope: Scope = Scope.fromScope(scope);
        if (statement) {

            return await this.execute(node.consequent, subScope, nextTrace);
        } else {

            if (node.alternate) {

                return await this.execute(node.alternate, subScope, nextTrace);
            }
        }
        return;
    };
