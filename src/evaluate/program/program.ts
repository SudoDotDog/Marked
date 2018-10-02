/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Program
 */

import * as EST from 'estree';
import { Scope } from "marked#variable/scope";
import { EVALUATE_FUNC } from 'marked#declare/evaluate';

export const ProgramExecuter: EVALUATE_FUNC<EST.Program> = function (this: any, program: EST.Program, scope: Scope) {
    program.body.forEach((expr: EST.Node) => {

    });
};
