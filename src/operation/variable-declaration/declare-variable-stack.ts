/**
 * @author WMXPY
 * @namespace Operation_VariableDeclaration
 * @description Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { IScope, ITrace, VARIABLE_TYPE } from "../../declare/variable";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { registerScopeVariableWithExpression, registerScopeVariableWithValue } from "../../util/register";
import { SandList } from "../../variable/sand-list";
import { SandMap } from "../../variable/sand-map";

export type DeclareVariableElement = {

    readonly id: string;
    readonly value: any;
};

export const declareVariableStack = async function (
    this: Sandbox,
    node: EST.VariableDeclaration,
    scope: IScope,
    currentTrace: ITrace,
    nextTrace: ITrace,
): Promise<DeclareVariableElement[]> {

    const type: VARIABLE_TYPE = node.kind as VARIABLE_TYPE;

    const results: DeclareVariableElement[] = [];
    for (const declaration of node.declarations) {

        switch (declaration.id.type) {

            case 'Identifier': {

                const id: string = declaration.id.name;
                const bindRegisterScopeVariable = registerScopeVariableWithExpression.bind(this);

                const result: any = await bindRegisterScopeVariable(node, type, id, declaration.init, scope, currentTrace, nextTrace);
                results.push({ id, value: result });

                break;
            }
            case 'ArrayPattern': {

                if (typeof declaration.init === 'undefined'
                    || declaration.init === null) {

                    throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                }

                const initValue: any = await this.execute(declaration.init, scope, nextTrace);

                if (!(initValue instanceof SandList)) {
                    throw error(ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED, declaration.init.type, node, currentTrace);
                }

                elementSizeCheck: if (initValue.length !== declaration.id.elements.length) {

                    nonIdentifierCheck: for (const eachElement of declaration.id.elements) {

                        if (!eachElement) {
                            break nonIdentifierCheck;
                        }
                        if (eachElement.type !== 'Identifier') {
                            break elementSizeCheck;
                        }
                    }
                    throw error(ERROR_CODE.DECLARATION_INIT_SIZE_NOT_MATCHED, initValue.length.toString(), node, currentTrace);
                }

                const bindRegisterScopeVariable = registerScopeVariableWithValue.bind(this);
                for (let i = 0; i < declaration.id.elements.length; i++) {

                    const pattern = declaration.id.elements[i];
                    if (!pattern) {

                        throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                    }

                    switch (pattern.type) {

                        case 'Identifier': {

                            const id: string = pattern.name;

                            const initPattern: any = initValue.get(i);

                            const value: any = await bindRegisterScopeVariable(
                                node,
                                type,
                                id,
                                initPattern,
                                scope,
                                currentTrace,
                            );

                            results.push({ id, value });
                            break;
                        }
                        default: {

                            throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, pattern.type, node, currentTrace);
                        }
                    }
                }
                break;
            }
            case 'ObjectPattern': {

                if (typeof declaration.init === 'undefined'
                    || declaration.init === null) {

                    throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                }

                const initValue: any = await this.execute(declaration.init, scope, nextTrace);

                if (!(initValue instanceof SandMap)) {
                    throw error(ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED, declaration.init.type, node, currentTrace);
                }

                const bindRegisterScopeVariable = registerScopeVariableWithValue.bind(this);
                for (const pattern of declaration.id.properties) {

                    if (!pattern) {

                        throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                    }
                    if (pattern.type !== 'Property') {

                        throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, pattern.type, node, currentTrace);
                    }
                    if (pattern.key.type !== 'Identifier') {

                        throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, pattern.key.type, node, currentTrace);
                    }

                    const id: string = pattern.key.name;
                    const initPattern = initValue.get(id);

                    const value = await bindRegisterScopeVariable(
                        node,
                        type,
                        id,
                        initPattern,
                        scope,
                        currentTrace,
                    );

                    results.push({ id, value });
                }
                break;
            }
            default: {

                throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, declaration.id.type, node, currentTrace);
            }
        }
    }
    return results;
};
