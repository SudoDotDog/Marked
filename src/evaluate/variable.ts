/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { Evaluator } from "../declare/evaluate";
import { Sandbox } from "../marked/sandbox";
import { assert } from "../util/error/assert";
import { error } from "../util/error/error";
import { validateObjectIsSandboxStructure } from "../util/node/validator";
import { getAssignmentOperation } from "../util/operation";
import { SandList } from "../variable/sand-list";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";
import { Variable } from "../variable/variable";

export const assignmentExpressionEvaluator: Evaluator<'AssignmentExpression'> =
    async function (this: Sandbox, node: EST.AssignmentExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const variable: Variable<any> = await (async ()
            : Promise<Variable<any>> => {

            if (node.left.type === 'Identifier') {

                const name: string = node.left.name;

                return assert(
                    scope.validateEditable(name).rummage(name) as Variable<any>,
                ).to.be.exist(ERROR_CODE.VARIABLE_IS_NOT_DEFINED).firstValue();
            } else if (node.left.type === 'MemberExpression') {

                const object: SandList<any> | SandMap<any>
                    = await this.execute(node.left.object, scope, nextTrace);
                const member: string | number = node.left.computed
                    ? await this.execute(node.left.property, scope, nextTrace)
                    : (node.left.property as EST.Identifier).name;

                if (!validateObjectIsSandboxStructure(object)) {

                    throw error(ERROR_CODE.UNKNOWN_ERROR, (object as any), node, trace);
                }

                const memberVariable: Variable<any> | undefined = object instanceof SandList
                    ? object.getRaw(assert(member as number).to.be.number(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST).firstValue())
                    : object.getRaw(assert(member as string).to.be.string(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP).firstValue());

                if (memberVariable) {

                    return memberVariable;
                } else {

                    if (object instanceof SandMap) {

                        const securedMember: string = assert(member as string).to.be.string(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP).firstValue();
                        object.set(securedMember, undefined);
                        const fetted: Variable<any> | undefined = object.getRaw(securedMember);

                        if (!fetted) {
                            throw error(ERROR_CODE.UNKNOWN_ERROR, (fetted as any).toString(), node, trace);
                        }
                        return fetted;
                    } else {
                        throw error(ERROR_CODE.MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED, (memberVariable as any), node, trace);
                    }
                }
            } else {

                throw error(ERROR_CODE.INTERNAL_ERROR, void 0, node, trace);
            }
        })();

        const operation: ((variableArg: Variable<any>, value: any) => any) | null = getAssignmentOperation(node.operator);
        if (!operation) {

            throw error(ERROR_CODE.ASSIGNMENT_NOT_SUPPORT, node.operator, node, trace);
        }

        const assignee: any = await this.execute(node.right, scope, nextTrace);
        operation(variable, assignee);

        return assignee;
    };
