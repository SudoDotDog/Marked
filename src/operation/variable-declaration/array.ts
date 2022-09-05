/**
 * @author WMXPY
 * @namespace Operation_VariableDeclaration
 * @description Array
 */

import * as EST from "estree";
import { ERROR_CODE } from "../../declare/error-code";
import { IScope, ITrace, VARIABLE_TYPE } from "../../declare/variable";
import { Sandbox } from "../../marked/sandbox";
import { error } from "../../util/error/error";
import { SandList } from "../../variable/sand-list";
import { DeclareVariableElement } from "./declare";
import { registerScopeVariableWithValue } from "./register";

export const declareVariableStackArray = async function (
    this: Sandbox,
    node: EST.VariableDeclaration,
    type: VARIABLE_TYPE,
    declaration: EST.VariableDeclarator,
    scope: IScope,
    currentTrace: ITrace,
    nextTrace: ITrace,
): Promise<DeclareVariableElement[]> {

    if (declaration.id.type !== 'ArrayPattern') {
        throw error(ERROR_CODE.INTERNAL_ERROR, 'Array Pattern Only', node, currentTrace);
    }

    const results: DeclareVariableElement[] = [];

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
    return results;
};
