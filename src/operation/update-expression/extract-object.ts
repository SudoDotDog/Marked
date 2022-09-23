/**
 * @author WMXPY
 * @namespace Operation_UpdateExpression
 * @description Extract Object
 */

import { SandClassInstance } from "../../variable/sand-class/sand-class-instance";
import { SandList } from "../../variable/sand-list";
import { SandMap } from "../../variable/sand-map";

export const extractObjectForUpdateExpression = (object: any): SandMap<any> | SandList<any> | null => {

    if (object instanceof SandMap) {
        return object;
    }
    if (object instanceof SandList) {
        return object;
    }

    if (object instanceof SandClassInstance) {
        return object.body;
    }

    return null;
};
