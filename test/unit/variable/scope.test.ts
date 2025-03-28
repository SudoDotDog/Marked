/**
 * @author WMXPY
 * @namespace Variable
 * @description Scope Test
 */

import Chance from "chance";
import { ERROR_CODE } from '../../../src/declare/error-code';
import { VARIABLE_TYPE } from '../../../src/declare/variable';
import { error } from '../../../src/util/error/error';
import { Scope } from '../../../src/variable/scope';

describe('Given an {Scope} class', (): void => {

    const rootScope = Scope.bridgeScope();
    const chance = new Chance('variable-scope');

    it('should be able set config', (): void => {

        const configName: string = chance.string();
        const configValue: string = chance.string();

        const scope: Scope = rootScope.child();
        scope.config(configName, configValue);

        expect((scope as any)._configs.get(configName)).toEqual(configValue);
    });

    it('should be able register constant variable', (): void => {

        const name: string = chance.string();
        const value: number = chance.integer();

        const scope: Scope = rootScope.child();
        scope.register(VARIABLE_TYPE.CONSTANT)(name, value);

        expect((scope as any)._constantMap.get(name).get()).toEqual(value);
        expect(() => scope.validateEditable(name)).toThrow(error(ERROR_CODE.CONSTANT_VARIABLE_CANNOT_BE_EDITED).message);
    });

    it('should be able register scoped variable', (): void => {

        const name: string = chance.string();
        const value: number = chance.integer();

        const scope: Scope = rootScope.child();
        scope.register(VARIABLE_TYPE.SCOPED)(name, value);

        expect((scope as any)._scopeMap.get(name).get()).toEqual(value);
        expect(() => scope.validateEditable(name)).not.toThrow;
    });
});
