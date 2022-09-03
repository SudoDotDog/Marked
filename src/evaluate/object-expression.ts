/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Object Expression
 */

import * as EST from "estree";
import { ERROR_CODE } from "../declare/error";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { error } from "../util/error/error";
import { validateLiteralOrIdentifier } from "../util/node/validator";
import { SandMap } from "../variable/sand-map";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountObjectExpression = (sandbox: ISandbox): void => {

    sandbox.mount('ObjectExpression', objectExpressionEvaluator);
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
