/**
 * @author WMXPY
 * @namespace MemberExpression_String
 * @description Standard
 * @override Integration Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MarkedResult, Sandbox } from '../../../../src';
import { ERROR_CODE } from '../../../../src/declare/error-code';
import { New_Line_Character } from '../../../../src/host/declare';
import { assertFailedMarkedResult, assertSucceedMarkedResult } from '../../../util/assert-result';

describe('Given Integration Member Expression String (Standard) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-member-expression-string-standard');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to execute concat', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.concat(' world');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('hello world');
    });

    it('should be able to execute endsWith', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.endsWith('lo');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to execute includes', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.includes('lo');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to execute pad end', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.padEnd(10, '_');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('hello_____');
    });

    it('should be able to execute pad start', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.padStart(10, '_');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('_____hello');
    });

    it('should be able to execute repeat', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello_';`,
            `export default string.repeat(3);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('hello_hello_hello_');
    });

    it('should be able to execute replace', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello_';`,
            `export default string.replace('_', 'world');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('helloworld');
    });

    it('should be able to execute slice', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.slice(1, 3);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('el');
    });

    it('should be able to execute split', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.split('');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.deep.equal(['h', 'e', 'l', 'l', 'o']);
    });

    it('should be able to execute substring', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.substring(1, 3);`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('el');
    });

    it('should be able to execute startsWith', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.startsWith('he');`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.true;
    });

    it('should be able to execute toLowerCase', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.toLowerCase();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('hello');
    });

    it('should be able to execute toUpperCase', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.toUpperCase();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('HELLO');
    });

    it('should be able to execute toString', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.toString();`,
        ].join(New_Line_Character));

        assertSucceedMarkedResult(result);

        expect(result.exports.default).to.be.equal('hello');
    });

    it('should be able to catch not found error', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: MarkedResult = await sandbox.evaluate([
            `const string = 'hello';`,
            `export default string.notFound();`,
        ].join(New_Line_Character));

        assertFailedMarkedResult(result);

        expect(result.error.code).to.be.equal(ERROR_CODE.STRING_METHOD_NOT_FOUND);
    });
});
