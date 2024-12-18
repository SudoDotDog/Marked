/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Continue Statement
 * @override Unit Test
 */

import Chance from "chance";
import * as EST from "estree";
import { ContinueStatementEvaluator } from "../../../src/evaluate/continue-statement";
import { Flag } from "../../../src/variable/flag";
import { MockSandbox } from "../../mock/sandbox";
import { MockScope } from "../../mock/scope";
import { MockTrace } from "../../mock/trace";
import { createExecuteWithMock } from "../../util/execute-with-mock";

describe("Given <ContinueStatement> Evaluators", (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance("evaluate-continue-statement");

    const sandbox: MockSandbox = new MockSandbox();
    const scope: MockScope = new MockScope();
    const trace: MockTrace = new MockTrace();

    const executeWithMock = createExecuteWithMock(sandbox, scope, trace);

    beforeEach((): void => {
        sandbox.reset();
        trace.reset();
    });

    it("should return a continue flag", async (): Promise<void> => {

        const testNode: EST.ContinueStatement = {

            type: "ContinueStatement",
        };

        const result: Flag = await executeWithMock(ContinueStatementEvaluator, testNode);

        expect(result).toBeInstanceOf(Flag);
        expect(result.isContinue()).toBeTruthy();
    });
});
