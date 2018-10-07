/**
 * @author WMXPY
 * @description Index
 */

require('./binding');
import * as FS from 'fs';
import { END_SIGNAL } from 'marked#declare/error';
import { useEverything } from 'marked#evaluate/evaluate';
import { internalPrint, internalSleep } from 'marked#extension/internal';
import { MarkedError } from 'marked#util/error/error';
import { Sandbox } from './sandbox';

export const marked = async (script: string): Promise<number> => {
    console.time('execute');
    const sandbox = new Sandbox();
    useEverything(sandbox);
    sandbox.inject('print', internalPrint);
    sandbox.inject('sleep', internalSleep);
    try {
        await sandbox.evaluate(script);
    } catch (error) {
        const markedError: MarkedError = error;
        throw markedError;
    }
    console.timeEnd('execute');
    console.log(sandbox.exposed);
    return END_SIGNAL.SUCCEED;
};

marked(FS.readFileSync('example/test.js', 'utf8')).then((result) => {
    console.log('result:', result);
}).catch((err) => {
    console.log('error:', err);
});
