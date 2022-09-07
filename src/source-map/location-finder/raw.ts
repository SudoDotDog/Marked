/**
 * @author WMXPY
 * @namespace SourceMap_LocationFinder
 * @description Raw
 */

import * as EST from "estree";
import { BaseSourceMapLocationFinder } from "./base";

export class RawSourceMapLocationFinder extends BaseSourceMapLocationFinder {

    public static fromEmpty(): RawSourceMapLocationFinder {

        return new RawSourceMapLocationFinder();
    }

    private constructor(
    ) {
        super();
    }

    public findSourceLocation(position: EST.Position): EST.Position {

        return position;
    }
}
