/**
 * @author WMXPY
 * @description Index
 */

require('./binding');
import * as FS from 'fs';
import { END_SIGNAL, IMarkedResult } from 'marked#declare/node';
import { useEverything } from 'marked#evaluate/evaluate';
import { internalPrint, internalSleep } from 'marked#extension/internal';
import { MarkedError } from 'marked#util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string): Promise<IMarkedResult> => {
    console.time('execute');
    const sandbox = new Sandbox();
    useEverything(sandbox);
    sandbox.provide('print', internalPrint);
    sandbox.provide('sleep', internalSleep);
    try {
        await sandbox.evaluate(script);
    } catch (error) {
        const markedError: MarkedError = error;
        throw markedError;
    }
    console.log('Expression count: ' + sandbox.count);
    console.timeEnd('execute');

    return {
        signal: END_SIGNAL.SUCCEED,
        exports: sandbox.exposed,
    };
};

marked(FS.readFileSync('example/test.js', 'utf8')).then((result) => {
    console.log('result:', result);
}).catch((err) => {
    console.log('error:', err);
});
