/**
 * @author WMXPY
 * @namespace Operation
 * @description Logical
 */

import * as EST from "estree";

export const getLogicalOperation
    = (symbol: EST.LogicalOperator)
        : ((left: any, right: any) => any) | null => {

        switch (symbol) {

            case '&&': return (left: any, right: any) => left && right;
            case '||': return (left: any, right: any) => left || right;
            case '??': return (left: any, right: any) => left ?? right;
        }

        return null;
    };
