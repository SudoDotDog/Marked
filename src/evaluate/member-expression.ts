/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Member Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { memberExpressionBoolean } from "../operation/member-expression/boolean";
import { memberExpressionClass } from "../operation/member-expression/class";
import { memberExpressionClassInstance } from "../operation/member-expression/class-instance";
import { executeMemberExpressionObject } from "../operation/member-expression/execute-object";
import { memberExpressionNumber } from "../operation/member-expression/number";
import { memberExpressionSandBigInt } from "../operation/member-expression/sand-bigint";
import { memberExpressionSandFunction } from "../operation/member-expression/sand-function";
import { GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL, memberExpressionSandList } from "../operation/member-expression/sand-list";
import { memberExpressionSandRegExp } from "../operation/member-expression/sand-regexp";
import { memberExpressionString } from "../operation/member-expression/string";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandFunction } from "../variable/sand-function/sand-function";
import { SandList } from "../variable/sand-list";
import { SandLiteralBigInt } from "../variable/sand-literal/bigint";
import { SandLiteralRegExp } from "../variable/sand-literal/regexp";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountMemberExpressionEvaluator = (sandbox: ISandbox): void => {

    sandbox.mount('MemberExpression', memberExpressionEvaluator);
};

export const memberExpressionEvaluator: Evaluator<'MemberExpression'> =
    async function (this: Sandbox, node: EST.MemberExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const computed: boolean = node.computed;

        const bindExecuteMemberExpressionObject =
            executeMemberExpressionObject.bind(this);
        const object: any = await bindExecuteMemberExpressionObject(node.object, scope, nextTrace);
        const key: string | number = computed
            ? await this.execute(node.property, scope, nextTrace)
            : (node.property as EST.Identifier).name;


        if (typeof object === 'undefined') {

            if (node.optional) {
                return undefined;
            }

            throw error(ERROR_CODE.CANNOT_READ_PROPERTY_OF_UNDEFINED, String(key), node, trace);
        }

        if (object === null) {

            if (node.optional) {
                return undefined;
            }

            throw error(ERROR_CODE.CANNOT_READ_PROPERTY_OF_NULL, String(key), node, trace);
        }

        if (typeof object === 'string') {
            return memberExpressionString(object, key);
        }
        if (typeof object === 'number') {
            return memberExpressionNumber(object, key);
        }
        if (typeof object === 'boolean') {
            return memberExpressionBoolean(object, key);
        }

        if (object instanceof SandList) {

            if (typeof key === 'number') {

                return object.get(key);
            } else if (typeof key === 'string') {

                const arrayMember: any = memberExpressionSandList(object, key);
                if (arrayMember !== GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL) {
                    return arrayMember;
                }
            }
            throw error(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST, key, node, trace);
        }

        if (object instanceof SandMap) {

            if (typeof key === 'string') {

                return object.get(key);
            }

            throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP, key.toString(), node, trace);
        }

        if (object instanceof SandFunction) {
            return memberExpressionSandFunction(object, key);
        }

        if (object instanceof SandClass) {
            return memberExpressionClass(object, key);
        }
        if (object instanceof SandClassInstance) {
            return memberExpressionClassInstance(object, key);
        }

        if (object instanceof SandLiteralBigInt) {
            return memberExpressionSandBigInt(object, key);
        }
        if (object instanceof SandLiteralRegExp) {
            return memberExpressionSandRegExp(object, key);
        }

        return object[key];
    };
