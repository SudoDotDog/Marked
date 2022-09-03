/**
 * @author WMXPY
 * @namespace Util
 * @description Declaration
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error-code";
import { IScope, ITrace, VARIABLE_TYPE } from "../declare/variable";
import { Sandbox } from "../marked/sandbox";
import { error } from "./error/error";
import { registerScopeVariable } from "./register";

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
                const bindRegisterScopeVariable = registerScopeVariable.bind(this);

                const result: any = await bindRegisterScopeVariable(node, type, id, declaration.init, scope, currentTrace, nextTrace);
                results.push({ id, value: result });

                break;
            }
            case 'ArrayPattern': {

                if (!declaration.init) {

                    throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                }

                if (declaration.init.type !== 'ArrayExpression') {

                    throw error(ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED, declaration.init.type, node, currentTrace);
                }

                elementSizeCheck: if (declaration.init.elements.length !== declaration.id.elements.length) {

                    nonIdentifierCheck: for (const eachElement of declaration.id.elements) {

                        if (!eachElement) {
                            break nonIdentifierCheck;
                        }
                        if (eachElement.type !== 'Identifier') {
                            break elementSizeCheck;
                        }
                    }
                    throw error(ERROR_CODE.DECLARATION_INIT_SIZE_NOT_MATCHED, declaration.init.elements.length.toString(), node, currentTrace);
                }


                const bindRegisterScopeVariable = registerScopeVariable.bind(this);
                for (let i = 0; i < declaration.id.elements.length; i++) {

                    const pattern = declaration.id.elements[i];
                    if (!pattern) {

                        throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                    }

                    switch (pattern.type) {

                        case 'Identifier': {

                            const id: string = pattern.name;

                            const initPattern = declaration.init.elements[i];
                            if (initPattern
                                && initPattern.type === 'SpreadElement') {

                                throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, initPattern.type, node, currentTrace);
                            }

                            const value: any = await bindRegisterScopeVariable(node, type, id, initPattern as EST.Expression, scope, currentTrace, nextTrace);
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

                if (!declaration.init) {

                    throw error(ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                }


                if (declaration.init.type !== 'ObjectExpression') {

                    throw error(ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED, declaration.init.type, node, currentTrace);
                }

                if (declaration.init.properties.length !== declaration.id.properties.length) {

                    throw error(ERROR_CODE.DECLARATION_INIT_SIZE_NOT_MATCHED, declaration.init.properties.length.toString(), node, currentTrace);
                }

                const bindRegisterScopeVariable = registerScopeVariable.bind(this);
                for (let i = 0; i < declaration.id.properties.length; i++) {

                    const pattern = declaration.id.properties[i];
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

                    const initPattern = declaration.init.properties[i];
                    if (!initPattern) {

                        throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, undefined, node, currentTrace);
                    }
                    if (initPattern.type !== 'Property') {

                        throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, initPattern.type, node, currentTrace);
                    }

                    const value = await bindRegisterScopeVariable(node, type, id, initPattern.value, scope, currentTrace, nextTrace);
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
