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
import { getArrayMember, GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL } from "../operation/array";
import { memberExpressionClass } from "../operation/member-expression/class";
import { memberExpressionClassInstance } from "../operation/member-expression/class-instance";
import { executeMemberExpressionObject } from "../operation/member-expression/execute-object";
import { error } from "../util/error/error";
import { SandClass } from "../variable/sand-class/sand-class";
import { SandClassInstance } from "../variable/sand-class/sand-class-instance";
import { SandList } from "../variable/sand-list";
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

        if (object instanceof SandList) {

            if (typeof key === 'number') {

                return object.get(key);
            } else if (typeof key === 'string') {

                const arrayMember: any = getArrayMember(object, key);
                if (arrayMember !== GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL) {
                    return arrayMember;
                }
            }

            throw error(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST, key, node, trace);
        } else if (object instanceof SandMap) {

            if (typeof key === 'string') {

                return object.get(key);
            }

            throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP, key.toString(), node, trace);
        } else if (object instanceof SandClass) {

            return memberExpressionClass(object, key);
        } else if (object instanceof SandClassInstance) {

            return memberExpressionClassInstance(object, key);
        }

        return object[key];
    };
