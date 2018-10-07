/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { error } from "marked#util/error/error";
import { rummageSpecialKeyword } from "marked#util/hack";
import { getBinaryOperation, getLogicalOperation, getUnaryOperation, getUpdateOperation } from "marked#util/operation";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Variable } from "marked#variable/variable";
import { Sandbox } from "../sandbox";

export const binaryExpressionEvaluator: Evaluator<'BinaryExpression'> =
    async function (this: Sandbox, node: EST.BinaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope, nextTrace);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope, nextTrace);

        const operation: ((left: any, right: any) => any) | null = getBinaryOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.BINARY_NOT_SUPPORT, node.operator);
        }

        return operation(await evalLeft(), await evalRight());
    };

export const logicalExpressionEvaluator: Evaluator<'LogicalExpression'> =
    async function (this: Sandbox, node: EST.LogicalExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope, nextTrace);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope, nextTrace);

        const operation: ((left: any, right: any) => any) | null = getLogicalOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.LOGICAL_NOT_SUPPORT, node.operator);
        }

        return operation(await evalLeft(), await evalRight());
    };

export const unaryExpressionEvaluator: Evaluator<'UnaryExpression'> =
    async function (this: Sandbox, node: EST.UnaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const evalValue: () => Promise<any> = async () => await this.execute(node.argument, scope, nextTrace);
        const value: any = await evalValue();

        if (rummageSpecialKeyword(node.operator, value, scope, this)) return value;
        const operation: ((value: any) => any) | null = getUnaryOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator);
        }

        return operation(value);
    };

export const updateExpressionEvaluator: Evaluator<'UpdateExpression'> =
    async function (this: Sandbox, node: EST.UpdateExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);
        const operation: ((value: any) => any) | null = getUpdateOperation(node.operator);
        if (!operation) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator);
        }
        switch (node.argument.type) {

            case 'Identifier':
                const variable: Variable | null = scope.rummage(node.argument.name);
                if (!variable) {

                    throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.argument.name);
                }

                const current: any = await this.execute(node.argument, scope, nextTrace);
                const result: any = operation(current);
                variable.set(result);
                return node.prefix ? result : current;
            default:
                throw error(ERROR_CODE.INTERNAL_ERROR);
        }
    };
