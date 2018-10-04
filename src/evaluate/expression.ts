/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { error, ERROR_CODE } from "marked#util/error";
import { Flag } from "marked#variable/flag";
import { SandList } from "marked#variable/sandlist";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const arrowFunctionEvaluator: Evaluator<'ArrowFunctionExpression'> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope): Promise<any> {

        const func = async (...args: any[]): Promise<any> => {

            const subScope = Scope.fromScope(scope);
            for (let i = 0; i < node.params.length; i++) {
                const pattern: EST.Identifier = node.params[i] as EST.Identifier;
                const value: any = args[i];

                subScope.register(VARIABLE_TYPE.CONSTANT)(pattern.name, value);
            }
            const result: Flag = await this.execute(node.body, subScope);
            if (result) {
                return result.getValue();
            }
        };
        return func;
    };

export const calleeEvaluator: Evaluator<'CallExpression'> =
    async function (this: Sandbox, node: EST.CallExpression, scope: Scope): Promise<any> {

        const func: () => any = await this.execute(node.callee, scope);
        const args = [];
        for (const arg of node.arguments) {
            args.push(await this.execute(arg, scope));
        }

        return func.apply(null, args);
    };

export const expressionEvaluator: Evaluator<'ExpressionStatement'> =
    async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope): Promise<any> {

        return await this.execute(node.expression, scope);
    };

export const forOfStatementEvaluator: Evaluator<'ForOfStatement'> =
    async function (this: Sandbox, node: EST.ForOfStatement, scope: Scope): Promise<any> {

        const lists: SandList<any> = await this.execute(node.right, scope);

        if (!(lists instanceof SandList)) {
            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST);
        }

        if (node.left.type !== 'VariableDeclaration') {
            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST);
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

            const result: any = await this.execute(node.body, subScope);
            if (result instanceof Flag) {

                if (result.isBreak) {
                    break loop;
                } else if (result.isReturn) {
                    return result.getValue();
                } else if (result.isContinue) {
                    continue loop;
                } else {
                    throw error(ERROR_CODE.INTERNAL_ERROR);
                }
            }
        }
        return;
    };

export const forStatementEvaluator: Evaluator<'ForStatement'> =
    async function (this: Sandbox, node: EST.ForStatement, scope: Scope): Promise<any> {

        const subScope: Scope = Scope.fromScope(scope);
        if (node.init) {

            await this.execute(node.init, subScope);
        }

        const test = async (): Promise<boolean> => {

            if (node.test) {

                const result: any = await this.execute(node.test, subScope);
                return Boolean(result);
            } else return true;
        };
        const update = async (): Promise<void> => {

            if (node.update) await this.execute(node.update, subScope);
        };

        loop: for (let limit = 0; (limit < 100 && await test()); limit++) {

            await update();
            const result: any = await this.execute(node.body, subScope);
            if (result instanceof Flag) {

                if (result.isBreak) {
                    break loop;
                } else if (result.isReturn) {
                    return result.getValue();
                } else if (result.isContinue) {
                    continue loop;
                } else {
                    throw error(ERROR_CODE.INTERNAL_ERROR);
                }
            }
        }
        return;
    };

export const ifStatementEvaluator: Evaluator<'IfStatement'> =
    async function (this: Sandbox, node: EST.IfStatement, scope: Scope): Promise<any> {

        const statement: boolean = Boolean(await this.execute(node.test, scope));
        const subScope: Scope = Scope.fromScope(scope);
        if (statement) {

            return await this.execute(node.consequent, subScope);
        } else {

            if (node.alternate) {

                return await this.execute(node.alternate, subScope);
            }
        }
        return;
    };
