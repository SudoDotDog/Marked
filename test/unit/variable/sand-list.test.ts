/**
 * @author WMXPY
 * @namespace Variable
 * @description Sand List
 */

import Chance from "chance";
import { SandList } from '../../../src/variable/sand-list';
import { Variable } from '../../../src/variable/variable';

describe('Given an {SandList} class', (): void => {

    const chance = new Chance('variable-sand-list');

    it('should be able create from scratch', (): void => {

        const value: string = chance.word();

        const list: SandList<string> = SandList.fromScratch();
        list.push(value);

        expect(list).toHaveLength(1);
    });

    it('should be able create raw list', (): void => {

        const value: string = chance.word();

        const list: SandList<string> = SandList.fromRawList([
            value,
        ]);

        expect(list).toHaveLength(1);
    });

    it('should be able create variable list', (): void => {

        const value: string = chance.word();

        const list: SandList<string> = SandList.fromVariableList([
            Variable.immutable(value),
        ]);

        expect(list).toHaveLength(1);
    });

    it('should be able clone sand list', (): void => {

        const value: string = chance.word();

        const list: SandList<string> = SandList.fromRawList([
            value,
        ]);
        const newList = list.clone();

        expect(newList).toHaveLength(1);
    });
});
