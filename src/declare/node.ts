/**
 * @author WMXPY
 * @namespace Declare
 * @description Evaluate
 */

import * as EST from "estree";
import { Marked } from "marked";
import { IESTreeType } from "marked#declare/types";
import { Scope } from "marked#variable/scope";

export type EST_TYPE = EST.Node['type'];

export type Evaluator<T extends EST_TYPE> = (this: Marked, node: IESTreeType[T], scope: Scope) => any;
