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
import { declareVariableStackArray } from "./array";
import { DeclareVariableElement } from "./declare";
import { declareVariableStackObject } from "./object";
import { registerScopeVariableWithExpression } from "./register";

export const declareVariableStack = async function (
    this: Sandbox,
    node: EST.VariableDeclaration,
    scope: IScope,
    currentTrace: ITrace,
    nextTrace: ITrace,
): Promise<DeclareVariableElement[]> {

    const type: VARIABLE_TYPE = node.kind as VARIABLE_TYPE;

    for (const declaration of node.declarations) {

        switch (declaration.id.type) {

            case "Identifier": {

                const results: DeclareVariableElement[] = [];

                const id: string = declaration.id.name;
                const bindRegisterScopeVariable = registerScopeVariableWithExpression.bind(this);

                const result: any = await bindRegisterScopeVariable(node, type, id, declaration.init, scope, currentTrace, nextTrace);
                results.push({ id, value: result });

                return results;
            }
            case "ArrayPattern": {

                const bindingDeclareVariableStackArray = declareVariableStackArray.bind(this);
                return await bindingDeclareVariableStackArray(node, type, declaration, scope, currentTrace, nextTrace);
            }
            case "ObjectPattern": {

                const bindingDeclareVariableStackObject = declareVariableStackObject.bind(this);
                return await bindingDeclareVariableStackObject(node, type, declaration, scope, currentTrace, nextTrace);
            }
            default: {

                throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, declaration.id.type, node, currentTrace);
            }
        }
    }

    throw error(ERROR_CODE.INTERNAL_ERROR, "No Declaration", node, currentTrace);
};
