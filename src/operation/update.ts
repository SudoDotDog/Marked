/**
 * @author WMXPY
 * @namespace Operation
 * @description Update
 */

import * as EST from "estree";

export const getUpdateOperation
    = (symbol: EST.UpdateOperator)
        : ((value: any) => any) | null => {

        switch (symbol) {

            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            case '++': return (value: any) => value + 1;
            case '--': return (value: any) => value - 1;
        }

        return null;
    };
