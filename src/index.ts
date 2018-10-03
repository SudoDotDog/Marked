/**
 * @author WMXPY
 * @description Index
 */

require('./binding');
import * as FS from 'fs';
import { useEverything } from 'marked#evaluate/evaluate';
import { Sandbox } from './sandbox';

export const marked = async (script: string): Promise<number> => {

    const sandbox = new Sandbox();
    useEverything(sandbox);
    sandbox.inject('print', console.log);
    try {
        await sandbox.evaluate(script);
    } catch (err) {
        throw err;
    }
    return 0;
};

marked(FS.readFileSync('example/test.js', 'utf8')).then((result) => {
    console.log('result:', result);
}).catch((err) => {
    console.log('error:', err);
});
