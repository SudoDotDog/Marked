/**
 * @author WMXPY
 * @namespace Variable
 * @description Declare
 */

export enum SCOPE_LABEL_LISTENER_TYPE {

    BREAK = "BREAK",
    CONTINUE = "CONTINUE",
}

export type ScopeLabelListener = (type: SCOPE_LABEL_LISTENER_TYPE) => void;
