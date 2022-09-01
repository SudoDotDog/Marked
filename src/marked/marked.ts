/**
 * @author WMXPY
 * @namespace Marked
 * @description Marked
 */

import { ERROR_CODE } from '../declare/error';
import { MarkedResult } from '../declare/evaluate';
import { IMarkedOptions, OptionName } from '../declare/sandbox';
import { error } from '../util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string, options?: IMarkedOptions): Promise<MarkedResult> => {

    if (!script) {

        throw error(ERROR_CODE.SCRIPT_CANNOT_BE_NULL_OR_UNDEFINED);
    }

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    if (options) {

        if (options.injects) {
            Object.keys(options.injects).forEach((key: string) =>
                sandbox.inject(key, (options.injects as any)[key]));
        }
        if (options.provides) {
            Object.keys(options.provides).forEach((key: string) =>
                sandbox.provide(key, (options.provides as any)[key]));
        }
        if (options.resolvers) {
            for (const resolver of options.resolvers) {
                sandbox.resolver(resolver);
            }
        }
        if (options.sandbox) {
            Object.keys(options.sandbox as any).forEach((key: any) =>
                sandbox.setOption(key as OptionName, (options.sandbox as any)[key]));
        }
    }

    return await sandbox.evaluate(script);
};
