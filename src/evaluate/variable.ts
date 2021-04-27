/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { assert } from "../util/error/assert";
import { error } from "../util/error/error";
import { validateLiteralOrIdentifier, validateObjectIsSandboxStructure } from "../util/node/validator";
import { getAssignmentOperation } from "../util/operation";
import { registerScopeVariable } from "../util/register";
import { SandList } from "../variable/sandlist";
import { SandMap } from "../variable/sandmap";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace";
import { Variable } from "../variable/variable";

export const arrayExpressionEvaluator: Evaluator<'ArrayExpression'> =
    async function (this: Sandbox, node: EST.ArrayExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const mapped: any[] = [];
        for (const element of node.elements) {

            if (element) {

                const evaluated: any = await this.execute(element, scope, nextTrace);
                mapped.push(evaluated);
            }
        }

        return new SandList(mapped);
    };

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

export const memberEvaluator: Evaluator<'MemberExpression'> =
    async function (this: Sandbox, node: EST.MemberExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const computed: boolean = node.computed;
        const object: any = await this.execute(node.object, scope, nextTrace);
        const key: string | number = computed
            ? await this.execute(node.property, scope, nextTrace)
            : (node.property as EST.Identifier).name;

        if (object instanceof SandList) {

            if (typeof key === 'number') {
                return object.get(key);
            } else {
                throw error(ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST, key, node, trace);
            }
        } else if (object instanceof SandMap) {

            if (typeof key === 'string') {
                return object.get(key);
            } else {
                throw error(ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP, key.toString(), node, trace);
            }
        }

        return object[key];
    };

export const objectExpressionEvaluator: Evaluator<'ObjectExpression'> =
    async function (this: Sandbox, node: EST.ObjectExpression, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const map: SandMap<any> = new SandMap();
        for (const property of node.properties) {

            if (property.type === 'SpreadElement') {
                throw error(ERROR_CODE.SPREAD_ELEMENT_NOT_SUPPORT, property.type, property, trace);
            }

            const keyNode: EST.Literal | EST.Identifier
                = property.key as EST.Literal | EST.Identifier;

            if (!validateLiteralOrIdentifier(keyNode)) {

                throw error(ERROR_CODE.UNKNOWN_ERROR, keyNode.type, keyNode, trace);
            }

            const key: string = keyNode.type === 'Literal'
                ? await this.execute(keyNode, scope, nextTrace)
                : keyNode.name;

            if (property.kind !== 'init') {

                throw error(ERROR_CODE.PROPERTY_KIND_NOT_INIT_NOT_SUPPORT, property.kind, property, trace);
            }
            map.set(key, await this.execute(property.value, scope, nextTrace));
        }

        return map;
    };

export const variableDeclarationEvaluator: Evaluator<'VariableDeclaration'> =
    async function (this: Sandbox, node: EST.VariableDeclaration, scope: Scope, trace: Trace): Promise<any> {

        const nextTrace: Trace = trace.stack(node);

        const type: VARIABLE_TYPE = node.kind as VARIABLE_TYPE;
        for (const declaration of node.declarations) {

            switch (declaration.id.type) {

                case 'Identifier': {

                    const id: string = declaration.id.name;
                    const bindRegisterScopeVariable = registerScopeVariable.bind(this);

                    await bindRegisterScopeVariable(node, type, id, declaration.init, scope, trace, nextTrace);

                    break;
                }
                case 'ArrayPattern': {

                    if (!declaration.init) {

                        throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, trace);
                    }

                    if (declaration.init.type !== 'ArrayExpression') {

                        throw error(ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED, declaration.init.type, node, trace);
                    }

                    if (declaration.init.elements.length !== declaration.id.elements.length) {

                        throw error(ERROR_CODE.DECLARATION_INIT_SIZE_NOT_MATCHED, declaration.init.elements.length.toString(), node, trace);
                    }

                    const bindRegisterScopeVariable = registerScopeVariable.bind(this);
                    for (let i = 0; i < declaration.id.elements.length; i++) {

                        const pattern = declaration.id.elements[i];
                        if (!pattern) {

                            throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, trace);
                        }
                        if (pattern.type !== 'Identifier') {

                            throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, pattern.type, node, trace);
                        }
                        const id: string = pattern.name;

                        const initPattern = declaration.init.elements[i];
                        if (initPattern
                            && initPattern.type === 'SpreadElement') {

                            throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, initPattern.type, node, trace);
                        }

                        await bindRegisterScopeVariable(node, type, id, initPattern as EST.Expression, scope, trace, nextTrace);
                    }
                    break;
                }
                default: {

                    console.log(declaration);

                    throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, declaration.id.type, node, trace);
                }
            }
        }
        return;
    };
