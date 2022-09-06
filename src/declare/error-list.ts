/**
 * @author WMXPY
 * @namespace Declare
 * @description Error List
 */

import { ERROR_CODE } from "./error-code";

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.UNKNOWN_ERROR]: 'Unknown error', // 1000
    [ERROR_CODE.SCRIPT_CANNOT_BE_NULL_OR_UNDEFINED]: 'Script cannot be null or undefined', // 1001

    [ERROR_CODE.PARSE_ERROR]: 'Parse error', // 1100
    [ERROR_CODE.TYPESCRIPT_COMPILE_ERROR]: 'Typescript compile error', // 1101

    [ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED]: 'Maximum code length limit exceed', // 1911
    [ERROR_CODE.MAXIMUM_EXPRESSION_LIMIT_EXCEED]: 'Maximum expression limit exceed', // 1912
    [ERROR_CODE.MAXIMUM_FOR_LOOP_LIMIT_EXCEED]: 'Maximum for loop limit exceed', // 1913
    [ERROR_CODE.MAXIMUM_FOR_OF_LOOP_LIMIT_EXCEED]: 'Maximum for of loop limit exceed', // 1914
    [ERROR_CODE.MAXIMUM_FOR_IN_LOOP_LIMIT_EXCEED]: 'Maximum for in loop limit exceed', // 1915
    [ERROR_CODE.MAXIMUM_WHILE_LOOP_LIMITED_EXCEED]: 'Maximum while loop limited exceed', // 1916
    [ERROR_CODE.MAXIMUM_DO_WHILE_LOOP_LIMITED_EXCEED]: 'Maximum do while loop limited exceed', // 1917

    [ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST]: 'Assert exist element not exist', // 2065
    [ERROR_CODE.ASSERT_BOOLEAN_OPPOSITE]: 'Assert boolean opposite', // 2066
    [ERROR_CODE.ASSERT_TYPE_NOT_MATCHED]: 'Assert type not matched', // 2067

    [ERROR_CODE.NEW_STATEMENT_SHOULD_CALL_ON_CLASS_ONLY]: 'New statement should call on class only', // 2100

    [ERROR_CODE.FOR_OF_LOOP_ONLY_FOR_LIST]: 'For of loop only for list', // 2387
    [ERROR_CODE.FOR_IN_LOOP_ONLY_FOR_MAP]: 'For in loop only for map', // 2388

    [ERROR_CODE.ONLY_NUMBER_AVAILABLE_FOR_LIST]: 'Only number available for list', // 2391
    [ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_MAP]: 'Only string available for map', // 2392
    [ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS]: 'Only string available for class', // 2393
    [ERROR_CODE.ONLY_STRING_AVAILABLE_FOR_CLASS_INSTANCE]: 'Only string available for class instance', // 2394

    [ERROR_CODE.MAP_ARGUMENT_SHOULD_BE_A_FUNCTION]: 'Map argument should be a function', // 2410
    [ERROR_CODE.FILTER_ARGUMENT_SHOULD_BE_A_FUNCTION]: 'Filter argument should be a function', // 2411

    [ERROR_CODE.VAR_DECLARATION_NOT_SUPPORT]: 'Var declaration not support', // 3003
    [ERROR_CODE.BINARY_NOT_SUPPORT]: 'Binary not support', // 3004
    [ERROR_CODE.UNARY_NOT_SUPPORT]: 'Unary not support', // 3005
    [ERROR_CODE.LOGICAL_NOT_SUPPORT]: 'Logical not support', // 3006
    [ERROR_CODE.ASSIGNMENT_NOT_SUPPORT]: 'Assignment not support', // 3007
    [ERROR_CODE.UNDEFINED_TEST_NOT_SUPPORT]: 'Undefined test not support', // 3008
    [ERROR_CODE.BESIDES_DECLARATION_NOT_SUPPORT]: 'Besides declaration not support', // 3009
    [ERROR_CODE.UNDEFINED_BESIDES_DECLARATION_NOT_SUPPORT]: 'Undefined besides declaration not support', // 3010

    [ERROR_CODE.BREAK_LABEL_IS_NOT_SUPPORT]: 'Break label is not support', // 3061
    [ERROR_CODE.CONTINUE_LABEL_IS_NOT_SUPPORT]: 'Continue label is not support', // 3062

    [ERROR_CODE.CONSTANT_VARIABLE_CANNOT_BE_EDITED]: 'Constant variable cannot be edited', // 3081
    [ERROR_CODE.IMMUTABLE_VARIABLE_CANNOT_BE_EDITED]: 'Immutable variable cannot be edited', // 3082

    [ERROR_CODE.EXPORT_NAMED_NOT_SUPPORT]: 'Export not default variable is not support', // 3107
    [ERROR_CODE.EXPORT_TYPE_OTHER_THAN_N_S_B_NOT_SUPPORT]: 'Export is only available for number, string and boolean', // 3108
    [ERROR_CODE.IMPORT_ONLY_AVAILABLE_IN_ROOT_SCOPE]: 'Import only available in root scope', // 3112
    [ERROR_CODE.IMPORT_OBJECT_NOT_FOUND]: 'Import object not found', // 3113
    [ERROR_CODE.IMPORT_NAMESPACE_IS_NOT_AN_OBJECT]: 'Import namespace is not an object', // 3114
    [ERROR_CODE.IMPORT_DEFAULT_OBJECT_HAVE_NO_DEFAULT_EXPORT]: 'Import default object have no default export', // 3115

    [ERROR_CODE.PROPERTY_KIND_NOT_INIT_NOT_SUPPORT]: 'Define get or set to a object is not supported', // 3151

    [ERROR_CODE.NEGATIVE_UNARY_ONLY_AVAILABLE_FOR_VALID_NUMBER]: 'Negative unary only available for valid number', // 3310

    [ERROR_CODE.POSITIVE_UPDATE_ONLY_AVAILABLE_FOR_VALID_NUMBER]: 'Positive update only available for valid number', // 3320

    [ERROR_CODE.IN_BINARY_OPERATION_ONLY_ALLOW_ON_MAP_OR_CLASS]: 'In binary operation only allow on map or class', // 3330
    [ERROR_CODE.IN_BINARY_OPERATION_ONLY_ALLOW_ON_IDENTIFIER]: 'In binary operation only allow on identifier', // 3331

    [ERROR_CODE.UNKNOWN_LANGUAGE]: 'Unknown language', // 4050

    [ERROR_CODE.DEBUGGER_WITHOUT_DEBUG_INTERCEPTOR]: 'Debugger without debug interceptor', // 5301

    [ERROR_CODE.UNMOUNTED_AST_TYPE]: 'Unmounted ast type', // 6001
    [ERROR_CODE.DUPLICATED_PROVIDED_MODULE_NAME]: 'Provided module name duplicated', // 6002
    [ERROR_CODE.MODULE_IS_NOT_PROVIDED]: 'Module is not provided', // 6003

    [ERROR_CODE.CANNOT_TRANSFER_CLASS_TO_NATIVE]: 'Cannot transfer class to native', // 6100
    [ERROR_CODE.CANNOT_TRANSFER_FUNCTION_TO_NATIVE]: 'Cannot transfer function to native', // 6101

    [ERROR_CODE.CANNOT_READ_PROPERTY_OF_UNDEFINED]: 'Cannot read property of undefined', // 6110

    [ERROR_CODE.MEMBER_EXPRESSION_VALUE_CANNOT_BE_UNDEFINED]: 'Member expression value cannot be undefined', // 6121

    [ERROR_CODE.DECLARATION_INIT_TYPE_NOT_MATCHED]: 'Declaration init type not matched', // 6201
    [ERROR_CODE.DECLARATION_INIT_SIZE_NOT_MATCHED]: 'Declaration init size not matched', // 6202

    [ERROR_CODE.DUPLICATED_VARIABLE]: 'Duplicated variable declaration', // 7005

    [ERROR_CODE.VARIABLE_IS_NOT_DEFINED]: 'Variable is not defined', // 7102

    [ERROR_CODE.TRACE_SHOULD_BE_CLASS_TRACE]: 'Trace should be class trace', // 7201

    [ERROR_CODE.PROPERTY_SHOULD_BE_IDENTIFIER]: 'Property should be identifier', // 7301
    [ERROR_CODE.CANNOT_DIVIDE_BY_ZERO]: 'Cannot divide by zero', // 7302

    [ERROR_CODE.CATCH_NOT_FOUND]: 'Catch not found', // 7501

    [ERROR_CODE.SANDBOX_IS_BROKE]: 'Sandbox is broke', // 7800

    [ERROR_CODE.CANNOT_CALL_MEMBER_FUNCTION_OF_UNDEFINED]: 'Cannot call member function of undefined', // 8001

    [ERROR_CODE.CANNOT_SPREAD_OTHER_THAN_ARRAY]: 'Cannot spread other than array', // 8101
    [ERROR_CODE.CANNOT_SPREAD_OTHER_THAN_MAP]: 'Cannot spread other than map', // 8102

    [ERROR_CODE.INTERNAL_ERROR]: 'Internal error', // 9001
};
