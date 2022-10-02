/**
 * @author WMXPY
 * @namespace Marked_Static
 * @description Declare
 */

import { MarkedDebugInterceptor } from "../../debug/interceptor";
import { MarkedMixin, ModuleResolver, ISandboxOptions, SandboxLanguage } from "../../declare/sandbox";

export type MarkedRunScriptOptions = {

    mixins?: Iterable<MarkedMixin>;
    injects?: Record<string, any>;
    provides?: Record<string, any>;
    resolvers?: Iterable<ModuleResolver>;
    sandbox?: Partial<ISandboxOptions>;
    debugInterceptor?: MarkedDebugInterceptor;
    language?: SandboxLanguage;
};

export const defaultMarkedRunScriptOptions: MarkedRunScriptOptions = {

    language: 'javascript',
};
