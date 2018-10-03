/**
 * @author WMXPY
 * @description Index
 */

require('./binding');
import { useSymbol } from 'marked#evaluate/evaluate';
import { Sandbox } from './sandbox';

export const marked = async (script: string): Promise<number> => {
    const sandbox = new Sandbox();
    useSymbol(sandbox);
    try {
        await sandbox.evaluate(script);
    } catch (err) {
        throw err;
    }
    return 0;
};

marked("console.log(1234)").then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
