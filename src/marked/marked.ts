/**
 * @author WMXPY
 * @namespace Marked
 * @description Marked
 */

import { MarkedResult } from '../declare/evaluate';
import { MarkedRunScriptOptions } from './static/declare';
import { markedRunScriptStaticMethod } from './static/run-script';

export class Marked {

    public static async runScript(
        script: string,
        options?: MarkedRunScriptOptions,
    ): Promise<MarkedResult> {

        return markedRunScriptStaticMethod(script, options);
    }
}
