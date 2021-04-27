/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { Flag } from "../variable/flag";
import { SandMap } from "../variable/sandmap";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";
import { Variable } from "../variable/variable";

export const blockEvaluator: Evaluator<'BlockStatement'> =
    async function (this: Sandbox, node: EST.BlockStatement, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const subScope: Scope = scope.child();
        for (const child of node.body) {

            const result: Flag = await this.execute(child, subScope, nextTrace);
            if (result instanceof Flag) {

                const flag: Flag = Flag.fromReturn(trace);
                flag.setValue(result);
                return result;
            }
        }

        return;
    };

export const breakEvaluator: Evaluator<'BreakStatement'> =
    // eslint-disable-next-line @typescript-eslint/require-await
    async function (this: Sandbox, node: EST.BreakStatement, scope: Scope, trace: Trace): Promise<Flag> {

        if (node.label) {

            throw error(ERROR_CODE.BREAK_LABEL_IS_NOT_SUPPORT, node.label.name, node, trace);
        }
        const flag: Flag = Flag.fromBreak(trace);

        return flag;
    };

export const continueEvaluator: Evaluator<'ContinueStatement'> =
    // eslint-disable-next-line @typescript-eslint/require-await
    async function (this: Sandbox, node: EST.ContinueStatement, scope: Scope, trace: Trace): Promise<Flag> {

        if (node.label) { throw error(ERROR_CODE.CONTINUE_LABEL_IS_NOT_SUPPORT, node.label.name, node, trace); }
        const flag: Flag = Flag.fromContinue(trace);

        return flag;
    };

export const identifierEvaluator: Evaluator<'Identifier'> =
    // eslint-disable-next-line @typescript-eslint/require-await
    async function (this: Sandbox, node: EST.Identifier, scope: Scope, trace: Trace): Promise<any> {

        const variable: Variable<any> | null = scope.rummage(node.name);
        if (variable) { return variable.get(); }
        throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.name, node, trace);
    };

export const literalEvaluator: Evaluator<'Literal'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.Literal, scope: Scope, trace: Trace): Promise<any> {

        return node.value;
    };

export const programEvaluator: Evaluator<'Program'> =
    async function (this: Sandbox, node: EST.Program, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        for (const child of node.body) {

            const result: any = await this.execute(child, scope, nextTrace);
            if (result instanceof Flag) {
                if (result.isThrow()) {
                    return result;
                }
            }
        }

        return;
    };

export const returnEvaluator: Evaluator<'ReturnStatement'> =
    async function (this: Sandbox, node: EST.ReturnStatement, scope: Scope, trace: Trace): Promise<Flag> {

        const nextTrace: Trace = trace.stack(node);

        const flag: Flag = Flag.fromReturn(trace);
        if (node.argument) {

            const value: any = await this.execute(node.argument, scope, nextTrace);
            flag.setValue(value);
        }

        return flag;
    };

export const thisExpressionEvaluator: Evaluator<'ThisExpression'> =
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    async function (this: Sandbox, node: EST.ThisExpression, scope: Scope, trace: Trace): Promise<SandMap<any>> {

        const thisValue: SandMap<any> = scope.findThis();
        return thisValue;
    };
