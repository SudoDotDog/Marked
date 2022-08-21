/**
 * @author WMXPY
 * @namespace Util_Node
 * @description Validator
 */

import * as EST from "estree";
import { SandList } from "../../variable/sand-list";
import { SandMap } from "../../variable/sand-map";

export const validateLiteralOrIdentifier
    = (node: EST.Literal | EST.Identifier): boolean => {

        if (node.type === 'Literal'
            || node.type === 'Identifier') {
            return true;
        }
        return false;
    };

export const validateObjectIsSandboxStructure
    = (object: any): boolean => {
        return ((object instanceof SandList) || (object instanceof SandMap));
    };
