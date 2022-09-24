/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Native Class Instance
 */

import { ISandbox } from "../../declare/sandbox";

export abstract class MarkedNativeClassInstance {

    public abstract getMember(name: string, sandbox: ISandbox): any;
    public abstract toNative(): any;
}
