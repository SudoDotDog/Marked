/**
 * @author WMXPY
 * @namespace Declare
 * @description Error
 */

export enum ERROR_CODE {
    UNKNOWN_ERROR = 1000,

    ASSERT_EXIST_ELEMENT_NOT_EXIST = 2065,
    ASSERT_BOOLEAN_OPPOSITE = 2066,
    ASSERT_TYPE_NOT_MATCHED = 2067,

    FOR_OF_LOOP_ONLY_FOR_LIST = 2387,

    ONLY_NUMBER_AVAILABLE_FOR_LIST = 2391,
    ONLY_STRING_AVAILABLE_FOR_MAP = 2392,

    VAR_DECLARATION_NOT_SUPPORT = 3003,
    BINARY_NOT_SUPPORT = 3004,
    UNARY_NOT_SUPPORT = 3005,
    LOGICAL_NOT_SUPPORT = 3006,
    ASSIGNMENT_NOT_SUPPORT = 3007,

    EXPORT_NAMED_NOT_SUPPORT = 3107,

    PROPERTY_KIND_NOT_INIT_NOT_SUPPORT = 3151,

    UNMOUNTED_AST_TYPE = 6001,

    MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED = 6121,

    DUPLICATED_VARIABLE = 7005,

    VARIABLE_IS_NOT_DEFINED = 7102,

    INTERNAL_ERROR = 9001,
}

export const ERROR_LIST: {
    [key: number]: string;
} = {
    1000: 'Unknown error',
    2065: 'Assert exist element not exist',
    2066: 'Assert boolean opposite',
    2067: 'Assert type not matched',
    2387: 'For of loop only for list',
    2391: 'Only number is available for list',
    2392: 'Only string is available for map',
    3003: 'Declaration with [var] is not supported',
    3004: 'Binary is not supported',
    3005: 'Unary is not supported',
    3006: 'Logical is not supported',
    3107: 'Export not default variable is not supported',
    3151: 'Define get or set to a object is not supported',
    6001: 'Unmounted ast type',
    6121: 'Member expression value cannot be undefined',
    7005: 'Duplicated variable declaration',
    7102: 'Variable is not defined',
    9001: 'Internal error',
};

export enum END_SIGNAL {
    SUCCEED = 0,
    FAILED = 1,
}
