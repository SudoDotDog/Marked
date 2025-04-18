/**
 * @author WMXPY
 * @namespace Marked E2E
 * @description Marked Test
 */

import Chance from "chance";
import { Marked } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { END_SIGNAL, MarkedResult } from '../../../src/declare/evaluate';
import { error } from '../../../src/util/error/error';
import { removeTimeStamps } from '../../util/result';

describe('Given {Marked} Class', (): void => {

    const chance = new Chance('sandbox-marked');

    it('should be able to handle run script static method', async (): Promise<void> => {

        const value: number = chance.integer();
        const result: MarkedResult = await Marked.runScript(`export default ${value};`);

        expect(removeTimeStamps(result)).toEqual({
            exports: {
                default: value,
                named: {},
            },
            signal: END_SIGNAL.SUCCEED,
            rootReturn: {
                hasRootReturn: false,
            },
            comments: [],
        });
    });

    it('should be able to handle import', async (): Promise<void> => {

        const provideName: string = chance.word();
        const provideValue: number = chance.integer();

        const result: MarkedResult = await Marked.runScript(`import a from '${provideName}';export default a;`, {
            provides: {
                [provideName]: {
                    default: provideValue,
                },
            },
        });

        expect(removeTimeStamps(result)).toEqual({
            exports: {
                default: provideValue,
                named: {},
            },
            signal: END_SIGNAL.SUCCEED,
            rootReturn: {
                hasRootReturn: false,
            },
            comments: [],
        });
    });

    it('should be able to handle inject', async (): Promise<void> => {

        const injectName: string = chance.word();
        const injectValue: number = chance.integer();

        const result: MarkedResult = await Marked.runScript(`export default ${injectName};`, {
            injects: {
                [injectName]: injectValue,
            },
        });

        expect(removeTimeStamps(result)).toEqual({
            exports: {
                default: injectValue,
                named: {},
            },
            signal: END_SIGNAL.SUCCEED,
            rootReturn: {
                hasRootReturn: false,
            },
            comments: [],
        });
    });

    it('should be able to handle sandbox options', async (): Promise<void> => {

        const result: MarkedResult = await Marked.runScript(`1+1`, {
            sandbox: {
                maxCodeLength: 2,
            },
        });

        expect(result.signal).toEqual(END_SIGNAL.ABORTED);
        expect((result as any).error.message).toEqual(error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED).message);
    });
});
