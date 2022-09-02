/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Arrow Function Expression
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../src';

describe('Given Sandbox for <ArrowFunctionExpression> Cases', (): void => {

    const chance = new Chance('sandbox-arrow-function-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle arrow function declare and apply', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`const a=()=>${value};deject(a());`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(value);
    });

    it('should be able to handle arrow function declare and apply with arguments', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`const a=(value)=>value;deject(a(${value}));`);

        expect(result).to.be.lengthOf(1);
        expect(result[0]).to.be.equal(value);
    });
});
