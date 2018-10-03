/**
 * @author WMXPY
 * @namespace Declare
 * @description Expression
 */

import * as EST from "estree";
import { EVALUATE_FUNC } from "marked#declare/evaluate";

export interface IExecuter {
    mount(func: EVALUATE_FUNC<EST.Node>): IExecuter;
    execute(node: EST.Node): any;
}