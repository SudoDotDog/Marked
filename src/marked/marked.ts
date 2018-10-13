/**
 * @author WMXPY
 * @description Simple
 */

require('../binding');
import { END_SIGNAL, IMarkedResult } from 'marked#declare/node';
import { ISandboxOptions, OptionName } from 'marked#declare/variable';
import { useEverything } from 'marked#evaluate/evaluate';
import { internalPrint } from 'marked#extension/internal';
import { MarkedError } from 'marked#util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string, options?: Partial<ISandboxOptions>): Promise<IMarkedResult> => {

    const sandbox = new Sandbox();
    useEverything(sandbox);

    sandbox.provide('print', internalPrint);

    if (options) Object.keys(options).forEach((key: string) =>
        sandbox.setOption(key as OptionName, (options as any)[key]));

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
