/**
 * @author WMXPY
 * @namespace Label
 * @description For In Statement
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, New_Line_Character, Sandbox } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { assertAbortedMarkedResult, assertSucceedMarkedResult } from '../../util/assert-result';

describe('Given Integration Label (For In Statement) Cases', (): void => {

    const chance = new Chance('integration-label-for-in-statement');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to break without labeled for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
            `if (item === 3) {`,
            `break;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to break labeled for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
            `if (item === 3) {`,
            `break outer;`,
            `}`,
            `count++;`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal(3);
    });

    it('should be able to break labeled stacked with nested stack', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
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

    it('should be able to break labeled stacked for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
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

    it('should be able to continue without labeled for in loop', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
            `if (item % 2 === 0) {`,
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
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
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
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
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
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
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

    it('should be able to throw when label not found', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const value: number = chance.integer({ min: 50, max: 100 });

        const result: MarkedResult = await sandbox.evaluate([
            `let count = 0;`,
            `const items = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}`,
            `outer: for (const item in items) {`,
            `inner: for (let j = 0;j < ${value};j++) {`,
            `if (j % 2 !== 0) {`,
            `continue random;`,
            `}`,
            `count++;`,
            `}`,
            `}`,
            `export default count;`,
        ].join(New_Line_Character));

        assertAbortedMarkedResult(result);

        expect(result.error.code).to.be.equal(ERROR_CODE.PARSE_ERROR);
    });
});
