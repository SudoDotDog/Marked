/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { assert } from "../util/error/assert";
import { error } from "../util/error/error";
import { LimitCounter } from "../util/node/context";
import { Flag } from "../variable/flag";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

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

        loop: for (const key of map.keys()) {

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

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result.getValue(); }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
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

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
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

            if (node.update) { await this.execute(node.update, subScope, nextTrace); }
        };

        loop: for (limitCounter.reset(); await test(); limitCounter.add()) {

            if (limitCounter.check()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_LOOP_LIMIT_EXCEED, void 0, node, trace);
            }

            const result: any = await this.execute(node.body, subScope, nextTrace);
            await update();
            if (result instanceof Flag) {

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
            }
        }
        return;
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

        const returnStatement: EST.Node
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

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
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

                    if (result.isBreak()) { break loop; }
                    else if (result.isReturn()) { return result; }
                    else if (result.isContinue()) { continue loop; }
                    else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
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

                if (result.isBreak()) { break loop; }
                else if (result.isReturn()) { return result; }
                else if (result.isContinue()) { continue loop; }
                else { throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace); }
            }
        }

        return;
    };
