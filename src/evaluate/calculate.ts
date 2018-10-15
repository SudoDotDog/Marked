/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Calculate
 */

import * as EST from "estree";
import { ERROR_CODE } from "marked#declare/error";
import { Evaluator } from "marked#declare/node";
import { assert } from "marked#util/error/assert";
import { error } from "marked#util/error/error";
import { rummageSpecialKeyword } from "marked#util/hack";
import { validateObjectIsSandboxStructure } from "marked#util/node/validator";
import { getBinaryOperation, getLogicalOperation, getUnaryOperation, getUpdateOperation } from "marked#util/operation";
import { SandList } from "marked#variable/sandlist";
import { SandMap } from "marked#variable/sandmap";
import { Scope } from "marked#variable/scope";
import { Trace } from "marked#variable/trace";
import { Variable } from "marked#variable/variable";
import { Sandbox } from "../marked/sandbox";

export const binaryExpressionEvaluator: Evaluator<'BinaryExpression'> =
    async function (this: Sandbox, node: EST.BinaryExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const evalLeft: () => Promise<any> = async () => await this.execute(node.left, scope, nextTrace);
        const evalRight: () => Promise<any> = async () => await this.execute(node.right, scope, nextTrace);

        const operation: ((left: any, right: any) => any) | null = getBinaryOperation(node.operator);

        if (!operation) {

            throw error(ERROR_CODE.BINARY_NOT_SUPPORT, node.operator, node, trace);
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

            throw error(ERROR_CODE.LOGICAL_NOT_SUPPORT, node.operator, node, trace);
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

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator, node, trace);
        }

        return operation(value);
    };

export const updateExpressionEvaluator: Evaluator<'UpdateExpression'> =
    async function (this: Sandbox, node: EST.UpdateExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const operation: ((value: any) => any) | null = getUpdateOperation(node.operator);
        if (!operation) {

            throw error(ERROR_CODE.UNARY_NOT_SUPPORT, node.operator, node, trace);
        }

        if (node.argument.type === 'Identifier') {

            const identifierVariable: Variable<any> | null = scope.rummage(node.argument.name);
            if (!identifierVariable) {

                throw error(ERROR_CODE.VARIABLE_IS_NOT_DEFINED, node.argument.name, node, trace);
            }

            const current: any = await this.execute(node.argument, scope, nextTrace);
            const result: any = operation(current);
            identifierVariable.set(result);
            return node.prefix ? result : current;
        } else if (node.argument.type === 'MemberExpression') {

            const argument: EST.MemberExpression = node.argument;
            const object: SandList<any> | SandMap<any>
                = await this.execute(argument.object, scope, nextTrace);
            const member: string | number = argument.computed
                ? await this.execute(argument.property, scope, nextTrace)
                : (argument.property as EST.Identifier).name;

            if (!validateObjectIsSandboxStructure(object))
                throw error(ERROR_CODE.UNKNOWN_ERROR, (object as any).toString(), node, trace);

            const memberVariable: Variable<any> | undefined = object instanceof SandList
                ? object.getRaw(assert(member as number).to.be.number(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST).firstValue())
                : object.getRaw(assert(member as string).to.be.string(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP).firstValue());
            const memberValue = memberVariable
                ? memberVariable.get()
                : undefined;
            if (!memberValue || !memberVariable)
                throw error(ERROR_CODE.MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED, memberValue, node, trace);

            const result: any = operation(memberValue);
            memberVariable.set(result);
            return node.prefix ? result : memberValue;
        }
        throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
    };
