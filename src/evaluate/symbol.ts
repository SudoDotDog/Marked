/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Symbol
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { error, ERROR_CODE } from "marked#util/error";
import { Flag } from "marked#variable/flag";
import { Scope } from "marked#variable/scope";
import { Variable } from "marked#variable/variable";
import { Sandbox } from "../sandbox";

export const blockEvaluator: Evaluator<'BlockStatement'> =
    async function (this: Sandbox, node: EST.BlockStatement, scope: Scope): Promise<any> {

        const subScope: Scope = Scope.fromScope(scope);
        for (const child of node.body) {

            const result: Flag = await this.execute(child, subScope);
            if (result instanceof Flag) {

                const flag: Flag = Flag.fromReturn();
                flag.setValue(result);
                return result;
            }
        }
        return;
    };

export const identifierEvaluator: Evaluator<'Identifier'> =
    async function (this: Sandbox, node: EST.Identifier, scope: Scope): Promise<any> {

        const variable: Variable | null = scope.rummage(node.name);
        if (variable) return variable.get();
        throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.name, node);
    };

export const literalEvaluator: Evaluator<'Literal'> =
    async function (this: Sandbox, node: EST.Literal, scope: Scope): Promise<any> {

        return node.value;
    };

export const programEvaluator: Evaluator<'Program'> =
    async function (this: Sandbox, node: EST.Program, scope: Scope): Promise<any> {

        for (const child of node.body) {

            await this.execute(child, scope);
        }
        return;
    };

export const returnEvaluator: Evaluator<'ReturnStatement'> =
    async function (this: Sandbox, node: EST.ReturnStatement, scope: Scope): Promise<Flag> {

        const flag: Flag = Flag.fromReturn();
        if (node.argument) {

            const value: any = await this.execute(node.argument, scope);
            flag.setValue(value);
        }
        return flag;
    };
