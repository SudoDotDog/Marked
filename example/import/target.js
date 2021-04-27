import Default, { b, c } from "./source";
import { d } from "./cache";
import print from 'print';

print(Default); // Should be 30
b();
b();
b();

export const resultBeforeD = c(); // Added 3, should print 3
d();

export const resultAfterD = c(); // Added extra 2, should print 5
export default Default;
