/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Inject Class
 * @override Integration Test
 */

/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import * as Chance from 'chance';
import { Sandbox } from '../../../src';
import { ERROR_CODE } from '../../../src/declare/error-code';
import { error } from '../../../src/util/error/error';

describe('Given Integration Sandbox (Inject Class) Cases', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance = new Chance('integration-sandbox-inject-class');

    const createSandbox = () => {
        const sandbox: Sandbox = Sandbox.fromAllEvaluators();
        return sandbox;
    };

    it('should be able to fail for inject class', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        class Test { }

        const exec = () => {

            sandbox.inject('Test', Test);
        };

        expect(exec).to.be.throw(error(ERROR_CODE.CANNOT_TRANSFER_NATIVE_TO_CLASS).message);
    });

    it('should be able to fail for inject class instance', async (): Promise<void> => {

        const sandbox: Sandbox = createSandbox();

        class Test { }
        const test = new Test();

        const exec = () => {

            sandbox.inject('test', test);
        };

        expect(exec).to.be.throw(error(ERROR_CODE.CANNOT_TRANSFER_NATIVE_TO_CLASS_INSTANCE).message);
    });
});
