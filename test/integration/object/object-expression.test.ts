/**
 * @author WMXPY
 * @namespace MemberExpression
 * @description Object
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from "../../../src";
import { assertSucceedMarkedResult } from "../../util/assert-result";

describe("Given Object (Object Expression) Cases", (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance("object-object-expression");

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it("should be able to update expression with member expression", async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();
        const result: MarkedResult = await sandbox.evaluate([
            "const a = 'key';",
            "const map = {[a]: 1};",
            "export default map.key;",
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(1);
    });
});
