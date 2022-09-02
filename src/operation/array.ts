/**
 * @author WMXPY
 * @namespace Operation
 * @description Array
 */

import { SandList } from "../variable/sand-list";

export const GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL = Symbol('GET_ARRAY_MEMBER_NOT_FOUND');

export const getArrayMember = (list: SandList<any>, key: string): any => {

    switch (key) {
        case 'length': {
            return list.length;
        }
    }
    return GET_ARRAY_MEMBER_NOT_FOUND_SYMBOL;
};
