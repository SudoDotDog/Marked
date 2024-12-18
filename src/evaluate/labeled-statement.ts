/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Labeled Statement
 */

import * as EST from "estree";
import { Evaluator } from "../declare/evaluate";
import { ISandbox } from "../declare/sandbox";
import { Sandbox } from "../marked/sandbox";
import { Scope } from "../variable/scope";
import { Trace } from "../variable/trace/trace";

export const mountLabeledStatement = (sandbox: ISandbox): void => {

    sandbox.mount("LabeledStatement", labeledStatementEvaluator);
};

export const labeledStatementEvaluator: Evaluator<"LabeledStatement"> =
    async function (this: Sandbox, node: EST.LabeledStatement, scope: Scope, trace: Trace): Promise<any> {

        const label: string = node.label.name;

        const nextTrace: Trace = trace.stackWithLabel(node, label);

        await this.execute(node.body, scope, nextTrace);

        return;
    };
