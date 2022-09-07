/**
 * @author WMXPY
 * @namespace SourceMap_LocationFinder
 * @description Base Location Finder
 */

import * as EST from "estree";

export abstract class BaseSourceMapLocationFinder {

    public abstract findSourceLocation(position: EST.Position): EST.Position;
}
