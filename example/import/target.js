import Default, { b, c } from "./source";
import print from 'print';

print(Default); // Should be 30
b();
b();
b();

export const result = c(); // Added 3, should print 3
export default Default;
