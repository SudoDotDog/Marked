/**
 * @author WMXPY
 * @namespace Util
 * @description Options Test
 */

import { expect } from 'chai';
import { ISandboxOptions } from '../../../src/declare/sandbox';
import { getCommentRemovedCode, getDefaultSandboxOption, getRawCode, getRawCodeLength } from '../../../src/util/options';

describe('Given an Options utils', (): void => {

    describe('test get default sandbox option', (): void => {

        it('should return a valid ISandboxOptions object', (): void => {

            const result: ISandboxOptions = getDefaultSandboxOption();
            expect(result).to.be.keys(

                'duration',
                'maxCodeLength',
                'maxExpression',
                'maxForLoopLimit',
                'maxWhileLoopLimit',
            );
        });
    });

    describe('test raw code parsers', (): void => {

        const testCode: string = [

            `import a from 'a'`,
            `const b = () => a // test`,
            `/*`,
            `add something`,
            `*/`,
            `b()`,
        ].join('\n');

        it('should remove comments', (): void => {

            const result: string = getCommentRemovedCode(testCode);
            expect(result.split('\n')).to.be.lengthOf(4);
        });

        it('should merge code to one line', (): void => {

            const result: string = getRawCode(testCode);
            expect(result.split('\n')).to.be.lengthOf(1);

            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            expect(result).to.be.lengthOf(37);
        });

        it('should shrink length', (): void => {

            const result: number = getRawCodeLength(testCode);

            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            expect(result).to.be.equal(37);
        });
    });
});
