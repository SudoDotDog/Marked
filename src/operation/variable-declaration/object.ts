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
import { SandMap } from "../../variable/sand-map";
import { DeclareVariableElement } from "./declare";
import { registerScopeVariableWithValue } from "./register";

export const declareVariableStackObject = async function (
    this: Sandbox,
    node: EST.VariableDeclaration,
    type: VARIABLE_TYPE,
    declaration: EST.VariableDeclarator,
    scope: IScope,
    currentTrace: ITrace,
    nextTrace: ITrace,
): Promise<DeclareVariableElement[]> {

    if (declaration.id.type !== "ObjectPattern") {
        throw error(ERROR_CODE.INTERNAL_ERROR, "Object Pattern Only", node, currentTrace);
    }

    const results: DeclareVariableElement[] = [];

    if (typeof declaration.init === "undefined"
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
        if (pattern.type !== "Property") {

            throw error(ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT, pattern.type, node, currentTrace);
        }
        if (pattern.key.type !== "Identifier") {

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
    return results;
};
