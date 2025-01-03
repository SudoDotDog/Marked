/**
 * @author WMXPY
 * @namespace Label
 * @description For Of Statement
 * @override Integration Test
 */

import Chance from "chance";
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Label (For Of Statement) Cases', (): void => {

    const chance = new Chance('integration-label-for-of-statement');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to break without labeled for of loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `if (item === 3) {`,
            `break;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(3);
    });

    it('should be able to break labeled for of loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `if (item === 3) {`,
            `break outer;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(3);
    });

    it('should be able to break labeled stacked with nested stack', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
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

        expect(result.exports.default).toEqual(10);
    });

    it('should be able to break labeled stacked for of loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
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

        expect(result.exports.default).toEqual(10);
    });

    it('should be able to continue without labeled for of loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = [0, 1, 2, 3, 4, 5]`,
            `outer: for (const item of items) {`,
            `if (item % 2 === 0) {`,
            `continue;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).toEqual(3);
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

        expect(result.exports.default).toEqual(3);
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
        expect(result.exports.default).toEqual(192);
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

        expect(result.exports.default).toEqual(6);
    });
});
