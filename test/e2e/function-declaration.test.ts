/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Declaration
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for <FunctionDeclaration> Cases', (): void => {

    const chance = new Chance('sandbox-function-declaration');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle function declaration and apply', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`function a(){return ${value}};deject(a());`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(value);
    });


    it('should be able to handle function declaration and apply with arguments', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`function a(value){return value};deject(a(${value}));`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(value);
    });
});
