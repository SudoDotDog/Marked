/**
 * @author WMXPY
 * @namespace Variable_NativeClass
 * @description Native Class Instance
 */

export abstract class MarkedNativeClassInstance {

    public abstract getMember(name: string): any;
    public abstract toNative(): any;
}
