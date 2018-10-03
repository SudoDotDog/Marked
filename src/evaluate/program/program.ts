/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Program
 */

import * as EST from "estree";
import { EVALUATE_FUNC } from "marked#declare/evaluate";
import { Scope } from "marked#variable/scope";

export const ProgramExecuter: EVALUATE_FUNC<EST.Program> = function (this: any, program: EST.Program, scope: Scope) {
    program.body.forEach((expr: EST.Node) => {

    });
};
