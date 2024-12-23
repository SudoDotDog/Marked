/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Update Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { getUpdateOperation } from "../operation/update";
import { extractObjectForUpdateExpression } from "../operation/update-expression/extract-object";
import { assert } from "../util/error/assert";
import { error } from "../util/error/error";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { Variable } from "../variable/variable";

export const mountUpdateExpression = (sandbox: ISandbox): void => {

    sandbox.mount("UpdateExpression", updateExpressionEvaluator);
};

export const updateExpressionEvaluator: Evaluator<"UpdateExpression"> =
    async function (this: Sandbox, node: EST.UpdateExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const operation: ((value: any) => any) | null = getUpdateOperation(node.operator);
        if (!operation) {

            throw error(
                ERROR_CODE.UNARY_NOT_SUPPORT,
                node.operator,
                node,
                trace,
            );
        }

        if (node.argument.type === "Identifier") {

            const identifierVariable: Variable<any> | null = scope.rummage(node.argument.name);
            if (!identifierVariable) {

                throw error(
                    ERROR_CODE.VARIABLE_IS_NOT_DEFINED,
                    node.argument.name,
                    node,
                    trace,
                );
            }

            const current: any = await this.execute(node.argument, scope, nextTrace);
            const result: any = operation(current);

            identifierVariable.set(result);

            return node.prefix ? result : current;
        } else if (node.argument.type === "MemberExpression") {

            const argument: EST.MemberExpression = node.argument;
            const preExtractObject: SandList<any> | SandMap<any>
                = await this.execute(argument.object, scope, nextTrace);
            const member: string | number =
                argument.computed
                    ? await this.execute(argument.property, scope, nextTrace)
                    : (argument.property as EST.Identifier).name;

            const object: SandList<any> | SandMap<any> | null =
                extractObjectForUpdateExpression(preExtractObject);

            if (object === null) {

                throw error(
                    ERROR_CODE.UNKNOWN_ERROR,
                    String(preExtractObject),
                    node,
                    trace,
                );
            }

            const memberVariable: Variable<any> | undefined =
                object instanceof SandList
                    ? object.getRaw(
                        assert(member as number).to.be.number(
                            ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST,
                        ).firstValue(),
                    )
                    : object.getRaw(
                        assert(member as string).to.be.string(
                            ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP,
                        ).firstValue(),
                    );
            const memberValue: any | undefined =
                memberVariable
                    ? memberVariable.get()
                    : undefined;

            if (typeof memberValue === "undefined"
                || typeof memberVariable === "undefined") {

                throw error(
                    ERROR_CODE.MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED,
                    memberValue,
                    node,
                    trace,
                );
            }

            const result: any = operation(memberValue);
            memberVariable.set(result);

            return node.prefix ? result : memberValue;
        }

        throw error(
            ERROR_CODE.INTERNAL_ERROR,
            void 0,
            node,
            trace,
        );
    };
