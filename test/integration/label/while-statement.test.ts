/**
 * @author WMXPY
 * @namespace Label
 * @description While Statement
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Label (While Statement) Cases', (): void => {

    const chance = new Chance('integration-label-while-statement');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to break without labeled for while loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `outer: while (true) {`,
            `if (count === 3) {`,
            `break;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to break labeled for while loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `outer: while (true) {`,
            `if (count === 3) {`,
            `break outer;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to break labeled while loop with nested stack', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `outer: while (true) {`,
            `for (let j = 0;j < 5;j++) {`,
            `middle: for (let k = 0;k < 5;k++) {`,
            `for (let l = 0;l < ${value};l++) {`,
            `if (l === 10) {`,
            `break outer;`,
            `}`,
            `count++;`,
            `}`,
            `}`,
            `}`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(10);
    });

    it('should be able to break labeled stacked while loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `outer: while (true) {`,
            `inner: for (let j = 0;j < ${value};j++) {`,
            `if (j === 10) {`,
            `break outer;`,
            `}`,
            `count++;`,
            `}`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(10);
    });

    it.only('should be able to continue without labeled while loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `outer: while (count <= 10) {`,
            `if (count % 2 === 0) {`,
            `continue;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to continue labeled for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `if (item % 2 === 0) {`,
            `continue outer;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to continue labeled stacked with nested stack', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `for (let j = 0;j < 4;j++) {`,
            `middle: for (let k = 0;k < 4;k++) {`,
            `for (let l = 0;l < 4;l++) {`,
            `if (item % 2 === 0) {`,
            `continue outer;`,
            `}`,
            `count++;`,
            `}`,
            `}`,
            `}`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(result.exports.default).to.be.equal(192);
    });

    it('should be able to continue labeled stacked for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `inner: for (let j = 0;j < ${value};j++) {`,
            `if (j % 2 !== 0) {`,
            `continue outer;`,
            `}`,
            `count++;`,
            `}`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(6);
    });
});
