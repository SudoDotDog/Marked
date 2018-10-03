/**
 * @author WMXPY
 * @description Index
 */

require('./binding');
import { useEverything } from 'marked#evaluate/evaluate';
import { Sandbox } from './sandbox';

export const marked = async (script: string): Promise<number> => {
    const sandbox = new Sandbox();
    useEverything(sandbox);
    try {
        await sandbox.evaluate(script);
    } catch (err) {
        throw err;
    }
    return 0;
};

marked("print(1234)").then((result) => {
    console.log('result:', result);
}).catch((err) => {
    console.log('error:', err);
});
