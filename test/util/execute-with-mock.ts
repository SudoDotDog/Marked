/**
 * @author WMXPY
 * @namespace Util
 * @description Execute With Mock
 * @override Test
 */

import * as EST from "estree";
import { Evaluator } from "../../src/declare/evaluate";
import { Sandbox } from "../../src/marked/sandbox";
import { Scope } from "../../src/variable/scope";
import { Trace } from "../../src/variable/trace";
import { MockSandbox } from "../mock/sandbox";
import { MockScope } from "../mock/scope";
import { MockTrace } from "../mock/trace";

export type ExecuteWithMockFunction = (
    evaluator: Evaluator<any>,
    node: EST.Node,
) => Promise<any>;

export const createExecuteWithMock = (
    sandbox: MockSandbox,
    scope: MockScope,
    trace: MockTrace,
): ExecuteWithMockFunction => {

    return async (evaluator: Evaluator<any>, node: EST.Node): Promise<any> => {

        return await executeWithMockInstances(evaluator, node, sandbox, scope, trace);
    };
};

export const executeWithMockInstances = async (
    evaluator: Evaluator<any>,
    node: EST.Node,
    sandbox: MockSandbox,
    scope: MockScope,
    trace: MockTrace,
): Promise<any> => {

    return await evaluator
        .bind(
            sandbox as any as Sandbox,
        )(
            node,
            scope as any as Scope,
            trace as any as Trace,
        );
};
