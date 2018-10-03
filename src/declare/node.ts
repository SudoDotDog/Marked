/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import * as EST from "estree";
import { IESTreeType } from "marked#declare/types";
import { Scope } from "marked#variable/scope";
import { Sandbox } from "../sandbox";

export type EST_TYPE = EST.Node['type'];

export type Evaluator<T extends EST_TYPE> = (this: Sandbox, node: IESTreeType[T], scope: Scope) => any;
