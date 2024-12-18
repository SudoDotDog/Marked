/**
 * @author WMXPY
 * @namespace Evaluate
 * @description Function Expression
 * @override E2E Test
 */

import Chance from "chance";
import { Sandbox } from '../../src/marked/sandbox';

describe('Given Sandbox for <FunctionExpression> Cases', (): void => {

    const chance = new Chance('sandbox-function-expression');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to handle function expression and apply', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`const a = function(){return ${value}};deject(a());`);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(value);
    });


    it('should be able to handle function expression and apply with arguments', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        const result: any[] = [];
        const value: number = chance.integer({ max: 10, min: 1 });
        sandbox.inject('deject', (content: any) => result.push(content));

        await sandbox.evaluate(`const a = function(value){return value};deject(a(${value}));`);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(value);
    });
});
