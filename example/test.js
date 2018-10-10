import print from 'print'; // trailing
import sleep from 'sleep';

let a = 10; // test
const ll = [656, 2, 3, 1, 1, 1, 1, 1, 1];
const ccc = {
    a: {
        a: 1,
    },
    b: () => 1,
    'some': 2,
}
ccc.a.a = 20;
ccc.a.a++;
a = 20;
ccc.some++;
print('some', ccc.some, ccc.a.a, a);
function someFunction() {
    return print('some function');
}

do {
    a++;
} while (a < 300);
print('while, conditional', a > 10 ? a : false);

for (let u in ccc) {
    print('uuu', u);
}
print((() => { return (print(1), 2) })());
this.a = 100;
print('this', this.a);

someFunction();
const b = (c) => {
    if (!c) {
        print(3, c++ + 1);
    } else {
        sleep(10);
        for (let i = 0; i < 3; i++) {
            print(3, c++ + 1);
            break;
        }
    }
    return c; // test
};
print('member compare', ccc.some > 1);
print(ll[0]++, ++ll[0], 'array');
const q = (f) => {
    f(a);
};
export default a;
q(b);