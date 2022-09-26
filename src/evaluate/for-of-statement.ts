/**
 * @author WMXPY
 * @namespace Evaluate
 * @description For Of Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { LimitCounter } from "../util/node/context";
import { SCOPE_LABEL_LISTENER_TYPE } from "../variable/declare";
import { Flag } from "../variable/flag";
import { SandList } from "../variable/sand-list";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountForOfStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ForOfStatement', forOfStatementEvaluator);
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

        let loopIsBreaking: boolean = false;
        let loopIsContinuing: boolean = false;

        if (trace.hasLabel()) {

            scope.registerLabelListener(
                trace.ensureLabel(),
                (type: SCOPE_LABEL_LISTENER_TYPE) => {

                    if (type === SCOPE_LABEL_LISTENER_TYPE.BREAK) {
                        this.skip();
                        loopIsBreaking = true;
                    }

                    if (type === SCOPE_LABEL_LISTENER_TYPE.CONTINUE) {
                        this.skip();
                        loopIsContinuing = true;
                    }
                },
            );
        }

        loop: for (const element of lists.list) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_OF_LOOP_LIMIT_EXCEED, void 0, node, trace);
            }

            if (loopIsBreaking) {

                this.recoverFromSkip();
                break loop;
            }

            const subScope: Scope = scope.child();
            const current: any = element;
            const declarations: EST.VariableDeclarator[] = node.left.declarations;
            const left: EST.VariableDeclaration = node.left;
            const registerFunc = (name: string): void => {

                const registerer = subScope.register(left.kind as VARIABLE_TYPE);
                registerer(name, current);
            };

            declarations.forEach((declaration) => {

                const id: EST.Identifier = declaration.id as EST.Identifier;
                registerFunc(id.name);
            });

            const result: any = await this.execute(node.body, subScope, nextTrace);

            if (loopIsContinuing) {

                this.recoverFromSkip();
                loopIsContinuing = false;

                continue loop;
            }

            if (result instanceof Flag) {

                if (result.isBreak()) {

                    if (typeof result.getValue() === 'string') {

                        const breakingLabel: string = result.getValue();
                        scope.executeLabelListener(
                            breakingLabel,
                            SCOPE_LABEL_LISTENER_TYPE.BREAK,
                        );

                        break loop;
                    }
                    break loop;
                } else if (result.isReturn()) {

                    return result;
                } else if (result.isContinue()) {

                    if (typeof result.getValue() === 'string') {

                        if (trace.hasLabel()
                            && trace.ensureLabel() === result.getValue()) {

                            continue loop;
                        }

                        const continuingLabel: string = result.getValue();
                        scope.executeLabelListener(
                            continuingLabel,
                            SCOPE_LABEL_LISTENER_TYPE.CONTINUE,
                        );

                        break loop;
                    }
                    continue loop;
                } else {

                    throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
            }
        }

        if (loopIsBreaking || loopIsContinuing) {
            this.recoverFromSkip();
        }
        return;
    };
