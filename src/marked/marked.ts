/**
 * @author WMXPY
 * @description Simple
 */

import _Map from '@sudoo/bark/map';
import { ERROR_CODE } from '../declare/error';
import { END_SIGNAL, MarkedResult } from '../declare/node';
import { IMarkedOptions, OptionName } from '../declare/sandbox';
import { useEverything } from '../evaluate/evaluate';
import { error } from '../util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string, options?: IMarkedOptions): Promise<MarkedResult> => {

    if (!script) {

        throw error(ERROR_CODE.SCRIPT_CANNOT_BE_NULL_OR_UNDEFINED);
    }

    const sandbox: Sandbox = Sandbox.create();
    useEverything(sandbox);

    if (options) {

        if (options.injects) {
            _Map.keys(options.injects).forEach((key: string) =>
                sandbox.inject(key, (options.injects as any)[key]));
        }
        if (options.provides) {
            _Map.keys(options.provides).forEach((key: string) =>
                sandbox.provide(key, (options.provides as any)[key]));
        }
        if (options.sandbox) {
            _Map.keys(options.sandbox as any).forEach((key: any) =>
                sandbox.setOption(key as OptionName, (options.sandbox as any)[key]));
        }
    }

    try {

        await sandbox.evaluate(script);
    } catch (markedError) {

        return {

            signal: END_SIGNAL.FAILED,
            error: markedError,
        };
    }

    return {

        signal: END_SIGNAL.SUCCEED,
        exports: sandbox.exposed,
    };
};
