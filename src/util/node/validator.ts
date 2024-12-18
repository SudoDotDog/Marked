/**
 * @author WMXPY
 * @namespace Util_Node
 * @description Validator
 */

import * as EST from "estree";

export const validateLiteralOrIdentifier
    = (node: EST.Literal | EST.Identifier): boolean => {

        if (node.type === "Literal"
            || node.type === "Identifier") {
            return true;
        }
        return false;
    };
