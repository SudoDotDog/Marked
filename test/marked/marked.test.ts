/**
 * @author WMXPY
 * @namespace Marked E2E
 * @description Marked Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { ERROR_CODE } from '../../src/declare/error';
import { END_SIGNAL, MarkedResult } from '../../src/declare/node';
import { marked } from '../../src/marked/marked';
import { error } from '../../src/util/error/error';

describe('Given Marked function', (): void => {

    const chance = new Chance('sandbox-marked');

    it('should be able to handle evaluate', async (): Promise<void> => {

        const value: number = chance.integer();
        const result: MarkedResult = await marked(`export default ${value};`);

        expect(result).to.be.deep.equal({
            exports: {
                default: value,
            },
            signal: END_SIGNAL.SUCCEED,
        });
    });

    it('should be able to handle import', async (): Promise<void> => {

        const provideName: string = chance.word();
        const provideValue: number = chance.integer();

        const result: MarkedResult = await marked(`import a from '${provideName}';export default a;`, {
            provides: {
                [provideName]: {
                    default: provideValue,
                },
            },
        });

        expect(result).to.be.deep.equal({
            exports: {
                default: provideValue,
            },
            signal: END_SIGNAL.SUCCEED,
        });
    });

    it('should be able to handle inject', async (): Promise<void> => {

        const injectName: string = chance.word();
        const injectValue: number = chance.integer();

        const result: MarkedResult = await marked(`export default ${injectName};`, {
            injects: {
                [injectName]: injectValue,
            },
        });

        expect(result).to.be.deep.equal({
            exports: {
                default: injectValue,
            },
            signal: END_SIGNAL.SUCCEED,
        });
    });

    it('should be able to handle sandbox options', async (): Promise<void> => {

        const result: MarkedResult = await marked(`1+1`, {
            sandbox: {
                maxCodeLength: 2,
            },
        });

        expect(result.signal).to.be.equal(END_SIGNAL.FAILED);
        expect((result as any).error.message).to.be.equal(error(ERROR_CODE.MAXIMUM_CODE_LENGTH_LIMIT_EXCEED).message);
    });
});
