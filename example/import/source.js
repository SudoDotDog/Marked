import print from 'print';
import A from "./third";

const a = 10 + A;
export default a;

let counter = 0;

export const b = () => counter++;
export const c = () => (print(counter), counter);
