/**
 * @author WMXPY
 * @namespace Evaluate
 * @description For In Statement
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { LimitCounter } from "../util/node/context";
import { Flag } from "../variable/flag";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountForInStatement = (sandbox: ISandbox): void => {

    sandbox.mount('ForInStatement', forInStatementEvaluator);
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

        loop: for (const key of map.keys()) {

            if (limitCounter.addAndCheck()) {

                this.break();
                throw error(ERROR_CODE.MAXIMUM_FOR_IN_LOOP_LIMIT_EXCEED, limitCounter.amount().toString(), node, trace);
            }

            const subScope: Scope = scope.child();
            const declarations: EST.VariableDeclarator[] = node.left.declarations;
            const left: EST.VariableDeclaration = node.left;
            const registerFunc = (name: string): void => {

                const registerer = subScope.register(left.kind as VARIABLE_TYPE);
                registerer(name, key);
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
