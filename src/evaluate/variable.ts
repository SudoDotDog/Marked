/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { error, ERROR_CODE } from "marked#util/error";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const variableDeclarationEvaluator: Evaluator<'VariableDeclaration'> = async function (this: Sandbox, node: EST.VariableDeclaration, scope: Scope): Promise<any> {
    const type: VARIABLE_TYPE = node.kind as VARIABLE_TYPE;

    for (const declaration of node.declarations) {
        const pattern: EST.Pattern = declaration.id;
        const identifier: EST.Identifier = pattern as EST.Identifier;

        if (scope.exist(identifier.name)) {
            throw error(ERROR_CODE.DUPLICATED_VARIABLE, identifier.name, node);
        }

        const value = declaration.init ?
            await this.execute(declaration.init, scope) : undefined;

        scope.register(type)(identifier.name, value);
    }

    return;
};
