const a = 10; // test
const ll = [656, 2, 3, 1, 1, 1, 1, 1, 1];
const ccc = {
    a: 1,
    b: () => 1,
    'some': 2,
}

ccc.some++;
print('some', ccc.some);

const b = (c) => {
    if (!c || true) {
        print(3, c++ + 1);
    } else {
        sleep(10);
        for (let i = 0; i < 3; i++) {

            break;
        }
    }
    return c; // test
};
print('member compare', ccc.some > 1);
print(ll[0], 'array');
const q = (f) => {
    f(a);
};
export default 1;
q(b);