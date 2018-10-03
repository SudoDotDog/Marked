/**
 * @author WMXPY
 * @description Index
 */

import { Marked } from './marked';

const marked = new Marked();

console.log(marked.evaluate("console.log(1234)"));
