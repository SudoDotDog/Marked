/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { assert } from "marked#util/error/assert";
import { error } from "marked#util/error/error";
import { LimitCounter } from "marked#util/node/context";
import { Flag } from "marked#variable/flag";
import { SandList } from "marked#variable/sandlist";
import { SandMap } from "marked#variable/sandmap";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Sandbox } from "../marked/sandbox";

export const arrowFunctionEvaluator: Evaluator<'ArrowFunctionExpression'> =
    async function (this: Sandbox, node: EST.ArrowFunctionExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const func = async (...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child();
            node.params.forEach((pattern: EST.Pattern, index: number) => {
                const identifier: EST.Identifier = pattern as EST.Identifier;
                const value: any = args[index];

                subScope.register(VARIABLE_TYPE.CONSTANT)(identifier.name, value);
            });

            if (node.body.type === 'BlockStatement') {

                const result: Flag = await this.execute(node.body, subScope, nextTrace);
                if (result) {

                    if (!Boolean(result.getValue)) throw error(ERROR_CODE.UNKNOWN_ERROR, result.toString(), node, trace);
                    return result.getValue();
                }
            } else {

                const result: any = await this.execute(node.body, subScope, nextTrace);
                const flag: Flag = Flag.fromReturn();
                flag.setValue(result || undefined);
                return flag.getValue();
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

        if (node.callee.type === 'MemberExpression') {

            const object = await this.execute(node.callee.object, scope, nextTrace);
            return func.apply(object, args);
        } else {

            return func.apply(null, args);
        }
    };

export const conditionalExpressionEvaluator: Evaluator<'ConditionalExpression'> =
    async function (this: Sandbox, node: EST.ConditionalExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const conditional: boolean = await this.execute(node.test, scope, nextTrace);

        return conditional
            ? await this.execute(node.consequent, scope, nextTrace)
            : await this.execute(node.alternate, scope, nextTrace);
    };

export const doWhileStatementEvaluator: Evaluator<'DoWhileStatement'> =
    async function (this: Sandbox, node: EST.DoWhileStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxWhileLoopLimit'));
        const test: () => Promise<boolean>
            = async () => await this.execute(node.test, scope, nextTrace);

        loop: do {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_DO_WHILE_LOOP_LIMITED_EXCEED, void 0, node, trace);
            }

            const subScope: Scope = scope.child();
            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        } while (await test());

        return;
    };

export const expressionEvaluator: Evaluator<'ExpressionStatement'> =
    async function (this: Sandbox, node: EST.ExpressionStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        return await this.execute(node.expression, scope, nextTrace);
    };

export const forInStatementEvaluator: Evaluator<'ForInStatement'> =
    async function (this: Sandbox, node: EST.ForInStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const map: SandMap<any> = await this.execute(node.right, scope, nextTrace);
        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxForLoopLimit'));

        if (!(map instanceof SandMap)) {
            throw error(ERROR_CODE.FOR_IN_LOOP_ONLY_FOR_MAP, void 0, node, trace);
        }

        if (node.left.type !== 'VariableDeclaration') {
            throw error(ERROR_CODE.FOR_IN_LOOP_ONLY_FOR_MAP, void 0, node, trace);
        }

        loop: for (const key of map.map.keys()) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_IN_LOOP_LIMIT_EXCEED, limitCounter.amount().toString(), node, trace);
            }

            const subScope: Scope = scope.child();
            const declarations: EST.VariableDeclarator[] = node.left.declarations;
            const left: EST.VariableDeclaration = node.left;
            const registerFunc = (name: string): void => {

                subScope.register(left.kind as VARIABLE_TYPE)(name, key);
            };

            declarations.forEach((declaration) => {

                const id: EST.Identifier = declaration.id as EST.Identifier;
                registerFunc(id.name);
            });

            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        }

        return;
    };

export const forOfStatementEvaluator: Evaluator<'ForOfStatement'> =
    async function (this: Sandbox, node: EST.ForOfStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const lists: SandList<any> = await this.execute(node.right, scope, nextTrace);
        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxForLoopLimit'));

        if (!(lists instanceof SandList)) {

            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST, void 0, node, trace);
        }

        if (node.left.type !== 'VariableDeclaration') {

            throw error(ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST, void 0, node, trace);
        }

        loop: for (const element of lists.list) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_OF_LOOP_LIMIT_EXCEED, void 0, node, trace);
            }

            const subScope: Scope = scope.child();
            const current: any = element;
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

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        }

        return;
    };

export const forStatementEvaluator: Evaluator<'ForStatement'> =
    async function (this: Sandbox, node: EST.ForStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxForLoopLimit'));
        if (node.init) {

            await this.execute(node.init, subScope, nextTrace);
        }

        const test = async (): Promise<boolean> => {

            if (node.test) {

                const result: any = await this.execute(node.test, subScope, nextTrace);
                return Boolean(result);
            }

            return true;
        };
        const update = async (): Promise<void> => {

            if (node.update) await this.execute(node.update, subScope, nextTrace);
        };

        loop: for (limitCounter.reset(); await test(); limitCounter.add()) {

            if (limitCounter.check()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_LOOP_LIMIT_EXCEED, void 0, node, trace);
            }

            const result: any = await this.execute(node.body, subScope, nextTrace);
            await update();
            if (result instanceof Flag) {

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        }
        return;
    };

export const functionExpressionEvaluator: Evaluator<'FunctionExpression'> =
    async function (this: Sandbox, node: EST.FunctionExpression, scope: Scope, trace: Trace): Promise<any> {
        const nextTrace: Trace = trace.stack(node);

        const func = async (...args: any[]): Promise<any> => {

            const subScope: Scope = scope.child().initThis();

            node.params.forEach((pattern: EST.Pattern, index: number) => {

                const identifier: EST.Identifier = pattern as EST.Identifier;
                const value: any = args[index];

                subScope.register(VARIABLE_TYPE.CONSTANT)(identifier.name, value);
            });

            const result: Flag = await this.execute(node.body, subScope, nextTrace);
            console.log(1231283901, result, node.body);
            if (result) return result.getValue();
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
        const subScope: Scope = scope.child();

        const statement: boolean = Boolean(await this.execute(node.test, scope, nextTrace));
        if (statement) {

            return await this.execute(node.consequent, subScope, nextTrace);
        } else {

            if (node.alternate) {

                return await this.execute(node.alternate, subScope, nextTrace);
            }
        }
        return;
    };

export const sequenceExpressionEvaluator: Evaluator<'SequenceExpression'> =
    async function (this: Sandbox, node: EST.SequenceExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const returnStatement: EST.BaseNode
            = assert(node.expressions.pop() as EST.Node).is.exist().firstValue();
        for (const statement of node.expressions) {

            await this.execute(statement, scope, nextTrace);
        }
        const result: any = await this.execute(returnStatement, scope, nextTrace);

        return result;
    };

export const switchCaseEvaluator: Evaluator<'SwitchCase'> =
    async function (this: Sandbox, node: EST.SwitchCase, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        loop: for (const test of node.consequent) {
            const result: any = await this.execute(test, scope, nextTrace);

            if (result instanceof Flag) {

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        }

        return;
    };

export const switchExpressionEvaluator: Evaluator<'SwitchStatement'> =
    async function (this: Sandbox, node: EST.SwitchStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const discriminant: any = await this.execute(node.discriminant, scope, nextTrace);
        loop: for (const test of node.cases) {

            if (!test.test) {

                throw error(ERROR_CODE.UNDEFINED_TEST_NOT_SUPPORT);
            }
            const match: any = await this.execute(test.test, subScope, nextTrace);

            if (match === discriminant) {

                const result: any = await this.execute(test, subScope, nextTrace);

                if (result instanceof Flag) {

                    if (result.isBreak) break loop;
                    else if (result.isReturn) return result.getValue();
                    else if (result.isContinue) continue loop;
                    else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
            }
        }

        return;
    };

export const whileStatementEvaluator: Evaluator<'WhileStatement'> =
    async function (this: Sandbox, node: EST.WhileStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const limitCounter: LimitCounter = new LimitCounter(this.getOption('maxWhileLoopLimit'));
        const test: () => Promise<boolean>
            = async () => await this.execute(node.test, scope, nextTrace);

        loop: while (await test()) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_WHILE_LOOP_LIMITED_EXCEED, void 0, node, trace);
            }

            const subScope: Scope = scope.child();
            const result: any = await this.execute(node.body, subScope, nextTrace);
            if (result instanceof Flag) {

                if (result.isBreak) break loop;
                else if (result.isReturn) return result.getValue();
                else if (result.isContinue) continue loop;
                else throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        }

        return;
    };
