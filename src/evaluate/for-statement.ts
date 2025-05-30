/**
 * @author WMXPY
 * @namespace Evaluate
 * @description For Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { LimitCounter } from "../util/node/context";
import { SCOPE_LABEL_LISTENER_TYPE } from "../variable/declare";
import { Flag } from "../variable/flag";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountForStatement = (sandbox: ISandbox): void => {

    sandbox.mount("ForStatement", forStatementEvaluator);
};

export const forStatementEvaluator: Evaluator<"ForStatement"> =
    async function (this: Sandbox, node: EST.ForStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();

        const limitCounter: LimitCounter = new LimitCounter(this.getOption("maxForLoopLimit"));

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

            if (node.update) {
                await this.execute(node.update, subScope, nextTrace);
            }
        };

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

        loop: for (limitCounter.reset(); await test(); limitCounter.add()) {

            if (limitCounter.check()) {

                this.break();
                throw error(
                    ERROR_CODE.MAXIMUM_FOR_LOOP_LIMIT_EXCEED,
                    void 0,
                    node,
                    trace,
                );
            }

            if (loopIsBreaking) {

                this.recoverFromSkip();
                break loop;
            }

            const result: any = await this.execute(node.body, subScope, nextTrace);

            if (loopIsContinuing) {

                this.recoverFromSkip();
                loopIsContinuing = false;

                await update();
                continue loop;
            }

            if (result instanceof Flag) {

                if (result.isBreak()) {

                    if (typeof result.getValue() === "string") {

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

                    if (typeof result.getValue() === "string") {

                        if (trace.hasLabel()
                            && trace.ensureLabel() === result.getValue()) {

                            await update();
                            continue loop;
                        }

                        const continuingLabel: string = result.getValue();
                        scope.executeLabelListener(
                            continuingLabel,
                            SCOPE_LABEL_LISTENER_TYPE.CONTINUE,
                        );

                        break loop;
                    }

                    await update();
                    continue loop;
                } else {

                    throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
                }
            }
            await update();
        }

        if (loopIsBreaking || loopIsContinuing) {
            this.recoverFromSkip();
        }
        return;
    };
