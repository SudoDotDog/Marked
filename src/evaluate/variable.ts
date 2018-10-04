/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Variable
 */

import * as EST from "estree";
import { Evaluator } from "marked#declare/node";
import { VARIABLE_TYPE } from "marked#declare/variable";
import { error, ERROR_CODE } from "marked#util/error";
import { SandList } from "marked#variable/sandlist";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export const arrayExpressionEvaluator: Evaluator<'ArrayExpression'> =
    async function (this: Sandbox, node: EST.ArrayExpression, scope: Scope): Promise<any> {

        const mapped: any[] = [];
        for (const element of node.elements) {
            const evaluated: any = await this.execute(element, scope);
            mapped.push(evaluated);
        }

        return new SandList(mapped);
    };

export const memberEvaluator: Evaluator<'MemberExpression'> =
    async function (this: Sandbox, node: EST.MemberExpression, scope: Scope): Promise<any> {

        const computed: boolean = node.computed;
        const object: any = await this.execute(node.object, scope);
        if (computed) {
            const member: any = await this.execute(node.property, scope);
            return await object[member];
        } else {
            return object[(node.property as EST.Identifier).name];
        }
    };

export const variableDeclarationEvaluator: Evaluator<'VariableDeclaration'> =
    async function (this: Sandbox, node: EST.VariableDeclaration, scope: Scope): Promise<any> {

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
