/**
 * @author WMXPY
 * @description Simple
 */

require('../binding');
import { END_SIGNAL, IMarkedResult } from 'marked#declare/node';
import { IMarkedOptions, OptionName } from 'marked#declare/sandbox';
import { useEverything } from 'marked#evaluate/evaluate';
import { MarkedError } from 'marked#util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string, options?: IMarkedOptions): Promise<IMarkedResult> => {

    const sandbox = new Sandbox();
    useEverything(sandbox);

    if (options) {

        if (options.injects)
            Object.keys(options.injects).forEach((key: string) =>
                sandbox.inject(key, (options.injects as any)[key]));
        if (options.provides)
            Object.keys(options.provides).forEach((key: string) =>
                sandbox.provide(key, (options.provides as any)[key]));
        if (options.sandbox)
            Object.keys(options.sandbox).forEach((key: string) =>
                sandbox.setOption(key as OptionName, (options.sandbox as any)[key]));
    }
    try {

        await sandbox.evaluate(script);
    } catch (error) {

        const markedError: MarkedError = error;
        throw markedError;
    }

    return {

        signal: END_SIGNAL.SUCCEED,
        exports: sandbox.exposed,
    };
};
