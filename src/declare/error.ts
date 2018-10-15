/**
 * @author WMXPY
 * @namespace Declare
 * @description Error
 */

export enum ERROR_CODE {

    UNKNOWN_ERROR = 1000,

    ACORN_ERROR = 1100,

    MAXIMUM_CODE_LENGTH_LIMIT_EXCEED = 1911,
    MAXIMUM_EXPRESSION_LIMIT_EXCEED = 1912,
    MAXIMUM_FOR_LOOP_LIMIT_EXCEED = 1913,
    MAXIMUM_FOR_OF_LOOP_LIMIT_EXCEED = 1914,
    MAXIMUM_FOR_IN_LOOP_LIMIT_EXCEED = 1915,
    MAXIMUM_WHILE_LOOP_LIMITED_EXCEED = 1916,
    MAXIMUM_DO_WHILE_LOOP_LIMITED_EXCEED = 1917,

    ASSERT_EXIST_ELEMENT_NOT_EXIST = 2065,
    ASSERT_BOOLEAN_OPPOSITE = 2066,
    ASSERT_TYPE_NOT_MATCHED = 2067,

    FOR_OF_LOOP_ONLY_FOR_LIST = 2387,
    FOR_IN_LOOP_ONLY_FOR_MAP = 2388,

    ONLY_NUMBER_AVAILABLE_FOR_LIST = 2391,
    ONLY_STRING_AVAILABLE_FOR_MAP = 2392,

    VAR_DECLARATION_NOT_SUPPORT = 3003,
    BINARY_NOT_SUPPORT = 3004,
    UNARY_NOT_SUPPORT = 3005,
    LOGICAL_NOT_SUPPORT = 3006,
    ASSIGNMENT_NOT_SUPPORT = 3007,
    UNDEFINED_TEST_NOT_SUPPORT = 3008,

    CONSTANT_VARIABLE_CANNOT_BE_EDITED = 3081,

    EXPORT_NAMED_NOT_SUPPORT = 3107,
    EXPORT_TYPE_OTHER_THAN_N_S_B_NOT_SUPPORT = 3108,

    IMPORT_ONLY_AVAILABLE_IN_ROOT_SCOPE = 3112,
    IMPORT_OBJECT_NOT_FOUND = 3113,
    IMPORT_NAMESPACE_IS_NOT_AN_OBJECT = 3114,
    IMPORT_DEFAULT_OBJECT_HAVE_NO_DEFAULT_EXPORT = 3115,

    PROPERTY_KIND_NOT_INIT_NOT_SUPPORT = 3151,

    UNMOUNTED_AST_TYPE = 6001,
    DUPLICATED_PROVIDED_MODULE_NAME = 6002,
    MODULE_IS_NOT_PROVIDED = 6003,

    MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED = 6121,

    DUPLICATED_VARIABLE = 7005,

    VARIABLE_IS_NOT_DEFINED = 7102,

    SANDBOX_IS_BROKE = 7800,

    INTERNAL_ERROR = 9001,
}

export const ERROR_LIST: {
    [key: number]: string;
} = {

    1000: 'Unknown error',
    1100: 'Parse error',
    1911: 'Maximum code length limit exceed',
    1912: 'Maximum expression limit exceed',
    1913: 'Maximum for loop limit exceed',
    1914: 'Maximum for of loop limit exceed',
    1915: 'Maximum for in loop limit exceed',
    1916: 'Maximum while limit exceed',
    1917: 'Maximum do while limit exceed',
    2065: 'Assert exist element not exist',
    2066: 'Assert boolean opposite',
    2067: 'Assert type not matched',
    2387: 'For of loop only for list',
    2388: 'For in loop only for map',
    2391: 'Only number is available for list',
    2392: 'Only string is available for map',
    3003: 'Declaration with [var] is not supported',
    3004: 'Binary is not supported',
    3005: 'Unary is not supported',
    3006: 'Logical is not supported',
    3007: 'Assignment is not supported',
    3008: 'Undefined test is not supported',
    3081: 'Constant variable cannot be edited',
    3107: 'Export not default variable is not supported',
    3108: 'Export is only available for number, string and boolean',
    3112: 'Import only available in root scope',
    3113: 'Import object not found',
    3114: 'Import namespace is not an object',
    3115: 'Import default object have no default export',
    3151: 'Define get or set to a object is not supported',
    6001: 'Unmounted ast type',
    6002: 'Provided module name duplicated',
    6003: 'Module is not provided',
    6121: 'Member expression value cannot be undefined',
    7005: 'Duplicated variable declaration',
    7102: 'Variable is not defined',
    7800: 'Sandbox is broke',
    9001: 'Internal error',
};
