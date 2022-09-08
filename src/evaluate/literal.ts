/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Literal
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { SandLiteralBigInt } from "../variable/sand-literal/bigint";
import { SandLiteralRegExp } from "../variable/sand-literal/regexp";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountLiteral = (sandbox: ISandbox): void => {

    sandbox.mount('Literal', literalEvaluator);
};

export const literalEvaluator: Evaluator<'Literal'> =
    async function (this: Sandbox, node: EST.Literal, _scope: Scope, _trace: Trace): Promise<any> {

        if (typeof (node as any).regex !== 'undefined') {

            const regexpNode: EST.RegExpLiteral = node as EST.RegExpLiteral;
            const sandRegExp: SandLiteralRegExp = SandLiteralRegExp.create(
                regexpNode.regex.pattern,
                regexpNode.regex.flags,
            );

            return sandRegExp;
        }

        if (typeof (node as any).bigint !== 'undefined') {

            const bigintNode: EST.BigIntLiteral = node as EST.BigIntLiteral;
            const sandBigint: SandLiteralBigInt = SandLiteralBigInt.create(bigintNode.bigint);

            return sandBigint;
        }

        return node.value;
    };
