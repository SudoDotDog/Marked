/**
 * @author WMXPY
 * @description Index
 */

import * as Acorn from 'acorn';
import { Executer } from 'marked#evaluate/expression';
import { ProgramExecuter } from 'marked#evaluate/program/program';

const executer = new Executer();
executer.mount(ProgramExecuter);

console.log(Acorn.parse("console.log(1234)"));
