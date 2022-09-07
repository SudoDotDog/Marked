/**
 * @author WMXPY
 * @namespace Marked
 * @description Declare
 */

import { BaseSourceMapLocationFinder } from "../source-map/location-finder/base";
import * as EST from "estree";

export type ParseScriptResult = {

    readonly locationFinder: BaseSourceMapLocationFinder;
    readonly estree: EST.Node;
};
